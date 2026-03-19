import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:codigotech/services/apk_download_service.dart';

class UpdateAvailableDialog extends StatefulWidget {
  const UpdateAvailableDialog({
    super.key,
    required this.latestVersion,
    required this.currentVersion,
    required this.downloadUrl,
    this.changelog,
  });

  final String latestVersion;
  final String currentVersion;
  final String downloadUrl;
  final String? changelog;

  @override
  State<UpdateAvailableDialog> createState() => _UpdateAvailableDialogState();
}

class _UpdateAvailableDialogState extends State<UpdateAvailableDialog> {
  static const String _fallbackDownloadUrl =
      'https://github.com/DevTech2code/CodigoTech/releases/download/apk-latest/CodigoTech-latest.apk';

  // Prevent repeated launches for the same update in the current app session.
  static final Set<String> _startedDownloadSignatures = <String>{};
  final ApkDownloadService _apkDownloadService = createApkDownloadService();

  bool _isOpeningDownload = false;
  double? _downloadProgress;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Actualización disponible'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Nueva versión: v${widget.latestVersion}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text('Actual: v${widget.currentVersion}'),
            if (widget.changelog != null && widget.changelog!.trim().isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(
                'Cambios:',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                widget.changelog!,
                style: Theme.of(context).textTheme.bodySmall,
                maxLines: 5,
                overflow: TextOverflow.ellipsis,
              ),
            ],
            if (_isOpeningDownload) ...[
              const SizedBox(height: 14),
              LinearProgressIndicator(
                value: _downloadProgress,
              ),
            ],
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: _isOpeningDownload ? null : Navigator.of(context).pop,
          child: const Text('Después'),
        ),
        FilledButton.icon(
          onPressed: _isOpeningDownload ? null : _downloadUpdate,
          icon: _isOpeningDownload
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Icon(Icons.download),
          label: Text(_isOpeningDownload ? _buildDownloadButtonLabel() : 'Descargar'),
        ),
      ],
    );
  }

  Future<void> _downloadUpdate() async {
    if (_isOpeningDownload) {
      return;
    }

    final navigator = Navigator.of(context);
    final messenger = ScaffoldMessenger.of(context);
    final signature = '${widget.latestVersion.trim()}|${widget.downloadUrl.trim()}';
    if (_startedDownloadSignatures.contains(signature)) {
      if (mounted) {
        messenger.showSnackBar(
          const SnackBar(
            content: Text('La descarga de esta version ya fue iniciada.'),
          ),
        );
        navigator.pop();
      }
      return;
    }

    setState(() {
      _isOpeningDownload = true;
      _downloadProgress = 0;
    });

    _startedDownloadSignatures.add(signature);

    try {
      final result = await _apkDownloadService.downloadAndOpenInstaller(
        downloadUrl: widget.downloadUrl,
        versionLabel: widget.latestVersion,
        onProgress: (progress) {
          if (!mounted) {
            return;
          }

          setState(() {
            _downloadProgress = progress.clamp(0.0, 1.0);
          });
        },
      );

      if (result.success) {
        if (mounted) {
          navigator.pop();
        }

        return;
      }

      _startedDownloadSignatures.remove(signature);

      if (mounted) {
        messenger.showSnackBar(
          SnackBar(
            content: Text(result.message),
            action: SnackBarAction(
              label: 'Copiar link',
              onPressed: () {
                Clipboard.setData(
                  const ClipboardData(text: _fallbackDownloadUrl),
                );
              },
            ),
          ),
        );
      }
    } catch (e) {
      _startedDownloadSignatures.remove(signature);
      if (mounted) {
        messenger.showSnackBar(
          SnackBar(content: Text('Error abriendo link: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isOpeningDownload = false;
          _downloadProgress = null;
        });
      }
    }
  }

  String _buildDownloadButtonLabel() {
    final progress = _downloadProgress;
    if (progress == null) {
      return 'Descargando...';
    }

    final percent = (progress * 100).round();
    return 'Descargando $percent%';
  }
}
