import 'dart:convert';

import 'package:codigotech/models/update_info.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';

abstract class UpdateCheckerService {
  Future<UpdateInfo> checkForUpdate();
}

class GitHubUpdateCheckerService implements UpdateCheckerService {
  static const String _owner = 'DevTech2code';
  static const String _repo = 'CodigoTech';
  static const String _releaseTag = 'apk-latest';
  static const String _apiUrl =
      'https://api.github.com/repos/$_owner/$_repo/releases/tags/$_releaseTag';

  @override
  Future<UpdateInfo> checkForUpdate() async {
    final packageInfo = await PackageInfo.fromPlatform();
    final currentVersion = packageInfo.version.trim();
    final currentBuild = _parseBuildNumber(packageInfo.buildNumber);

    try {
      final response = await http.get(
        Uri.parse(_apiUrl),
        headers: const {'Accept': 'application/vnd.github.v3+json'},
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode != 200) {
        return UpdateInfo.noUpdate(currentVersion: currentVersion);
      }

      final json = _parseJson(response.body);
      if (json is! Map<String, dynamic>) {
        return UpdateInfo.noUpdate(currentVersion: currentVersion);
      }

      final downloadUrl = _extractApkDownloadUrl(json);
      if (downloadUrl.isEmpty) {
        return UpdateInfo.noUpdate(currentVersion: currentVersion);
      }

      final latestVersion = _extractLatestVersion(json);
      if (latestVersion.isEmpty) {
        return UpdateInfo.noUpdate(currentVersion: currentVersion);
      }

      final latestBuild = _extractLatestBuild(json);
      final hasUpdate = _isRemoteNewer(
        latestVersion: latestVersion,
        latestBuild: latestBuild,
        currentVersion: currentVersion,
        currentBuild: currentBuild,
      );

      return UpdateInfo(
        latestVersion: latestVersion,
        currentVersion: currentVersion,
        downloadUrl: downloadUrl,
        hasUpdate: hasUpdate,
        changelog: json['body'] as String?,
      );
    } catch (_) {
      return UpdateInfo.noUpdate(currentVersion: currentVersion);
    }
  }

  dynamic _parseJson(String body) {
    try {
      return jsonDecode(body);
    } catch (_) {
      return null;
    }
  }

  String _extractLatestVersion(Map<String, dynamic> releaseJson) {
    final candidates = [
      releaseJson['name'] as String?,
      releaseJson['body'] as String?,
      releaseJson['tag_name'] as String?,
    ];

    for (final candidate in candidates) {
      final semver = _extractSemver(candidate ?? '');
      if (semver != null && semver.isNotEmpty) {
        return semver;
      }
    }

    return '';
  }

  int _extractLatestBuild(Map<String, dynamic> releaseJson) {
    final candidates = [
      releaseJson['name'] as String?,
      releaseJson['body'] as String?,
    ];

    for (final candidate in candidates) {
      if (candidate == null || candidate.trim().isEmpty) {
        continue;
      }

      final withPlus = RegExp(
        r'(?<!\d)\d+\.\d+\.\d+\+(\d+)(?!\d)',
      ).firstMatch(candidate);
      if (withPlus != null) {
        return int.tryParse(withPlus.group(1) ?? '') ?? 0;
      }

      final labeledBuild = RegExp(
        r'\bbuild\b\s*[:#\-]?\s*(\d+)',
        caseSensitive: false,
      ).firstMatch(candidate);
      if (labeledBuild != null) {
        return int.tryParse(labeledBuild.group(1) ?? '') ?? 0;
      }
    }

    return 0;
  }

  String _extractApkDownloadUrl(Map<String, dynamic> releaseJson) {
    final assets = releaseJson['assets'];
    if (assets is! List) {
      return '';
    }

    for (final asset in assets) {
      if (asset is! Map<String, dynamic>) {
        continue;
      }

      final name = asset['name'] as String?;
      if (name == 'CodigoTech-latest.apk') {
        return asset['browser_download_url'] as String? ?? '';
      }
    }

    return '';
  }

  bool _isRemoteNewer({
    required String latestVersion,
    required int latestBuild,
    required String currentVersion,
    required int currentBuild,
  }) {
    final latestParts = _parseSemver(latestVersion);
    final currentParts = _parseSemver(currentVersion);

    if (latestParts == null || currentParts == null) {
      return false;
    }

    for (var i = 0; i < 3; i++) {
      if (latestParts[i] > currentParts[i]) {
        return true;
      }

      if (latestParts[i] < currentParts[i]) {
        return false;
      }
    }

    return latestBuild > currentBuild;
  }

  List<int>? _parseSemver(String rawValue) {
    final semver = _extractSemver(rawValue);
    if (semver == null) {
      return null;
    }

    final parts = semver.split('.').map(int.tryParse).toList();
    if (parts.length != 3 || parts.any((part) => part == null)) {
      return null;
    }

    return [parts[0]!, parts[1]!, parts[2]!];
  }

  String? _extractSemver(String source) {
    final match = RegExp(
      r'(?<!\d)v?(\d+\.\d+\.\d+)(?:\+\d+)?(?!\d)',
    ).firstMatch(source);
    return match?.group(1);
  }

  int _parseBuildNumber(String rawBuild) {
    return int.tryParse(rawBuild.trim()) ?? 0;
  }
}
