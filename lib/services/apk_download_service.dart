import 'apk_download_service_impl_stub.dart'
    if (dart.library.io) 'apk_download_service_impl_io.dart';

abstract class ApkDownloadService {
  Future<ApkDownloadOutcome> downloadAndOpenInstaller({
    required String downloadUrl,
    required String versionLabel,
    void Function(double progress)? onProgress,
  });
}

class ApkDownloadOutcome {
  const ApkDownloadOutcome._({
    required this.success,
    required this.message,
    this.filePath,
  });

  final bool success;
  final String message;
  final String? filePath;

  factory ApkDownloadOutcome.success({required String filePath}) {
    return ApkDownloadOutcome._(
      success: true,
      message: 'Installer opened.',
      filePath: filePath,
    );
  }

  factory ApkDownloadOutcome.failure(String message) {
    return ApkDownloadOutcome._(success: false, message: message);
  }
}

ApkDownloadService createApkDownloadService() {
  return createApkDownloadServiceImpl();
}
