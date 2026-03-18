import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

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
  bool _isOpeningDownload = false;

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
          label: Text(_isOpeningDownload ? 'Abriendo...' : 'Descargar'),
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

    setState(() {
      _isOpeningDownload = true;
    });

    try {
      final uri = Uri.parse(widget.downloadUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(
          uri,
          mode: LaunchMode.externalApplication,
        );

        if (mounted) {
          navigator.pop();
        }

        return;
      }

      if (mounted) {
        messenger.showSnackBar(
          const SnackBar(content: Text('No se pudo abrir el enlace de descarga.')),
        );
      }
    } catch (e) {
      if (mounted) {
        messenger.showSnackBar(
          SnackBar(content: Text('Error abriendo link: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isOpeningDownload = false;
        });
      }
    }
  }
}
