class UpdateInfo {
  const UpdateInfo({
    required this.latestVersion,
    required this.currentVersion,
    required this.downloadUrl,
    required this.hasUpdate,
    this.changelog,
  });

  final String latestVersion;
  final String currentVersion;
  final String downloadUrl;
  final bool hasUpdate;
  final String? changelog;

  factory UpdateInfo.noUpdate({required String currentVersion}) {
    return UpdateInfo(
      latestVersion: currentVersion,
      currentVersion: currentVersion,
      downloadUrl: '',
      hasUpdate: false,
    );
  }
}
