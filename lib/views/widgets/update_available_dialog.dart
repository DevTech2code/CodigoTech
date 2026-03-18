import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class UpdateAvailableDialog extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Actualización disponible'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Nueva versión: v$latestVersion',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text('Actual: v$currentVersion'),
            if (changelog != null && changelog!.trim().isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(
                'Cambios:',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                changelog!,
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
          onPressed: Navigator.of(context).pop,
          child: const Text('Después'),
        ),
        FilledButton.icon(
          onPressed: () => _downloadUpdate(context),
          icon: const Icon(Icons.download),
          label: const Text('Descargar'),
        ),
      ],
    );
  }

  Future<void> _downloadUpdate(BuildContext context) async {
    try {
      final uri = Uri.parse(downloadUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(
          uri,
          mode: LaunchMode.externalApplication,
        );

        if (context.mounted) {
          Navigator.of(context).pop();
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error abriendo link: $e')),
        );
      }
    }
  }
}
