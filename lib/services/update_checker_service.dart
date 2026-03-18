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
    final currentVersion = packageInfo.version;

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

      final tagName = '${json['tag_name']}';
      final latestVersion = _normalizeVersion(tagName);
      final downloadUrl = _extractApkDownloadUrl(json);

      if (downloadUrl.isEmpty) {
        return UpdateInfo.noUpdate(currentVersion: currentVersion);
      }

      final hasUpdate = _isNewerVersion(latestVersion, currentVersion);

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
      // ignore: avoid_dynamic_calls
      return (const BetterJsonDecoder().convert(body));
    } catch (_) {
      return null;
    }
  }

  String _normalizeVersion(String version) {
    return version.replaceAll(RegExp(r'^v'), '').trim();
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

  bool _isNewerVersion(String latestVersion, String currentVersion) {
    final latestParts = latestVersion.split('.').map(int.tryParse).toList();
    final currentParts = currentVersion.split('.').map(int.tryParse).toList();

    final maxLength = [latestParts.length, currentParts.length].reduce(
      (a, b) => a > b ? a : b,
    );

    for (var i = 0; i < maxLength; i++) {
      final latestPart = latestParts.length > i ? latestParts[i] ?? 0 : 0;
      final currentPart = currentParts.length > i ? currentParts[i] ?? 0 : 0;

      if (latestPart > currentPart) {
        return true;
      }

      if (latestPart < currentPart) {
        return false;
      }
    }

    return false;
  }
}

class BetterJsonDecoder {
  const BetterJsonDecoder();

  dynamic convert(String input) {
    const jsonDecoder = UnicodeDecoder();
    return jsonDecoder.convert(input);
  }
}

class UnicodeDecoder {
  const UnicodeDecoder();

  dynamic convert(String input) {
    // Simple JSON parser that handles unicode properly
    return _parseValue(input, 0).$1;
  }

  (dynamic, int) _parseValue(String input, int pos) {
    pos = _skipWhitespace(input, pos);

    if (pos >= input.length) {
      throw const FormatException('Unexpected end of input');
    }

    final char = input[pos];

    if (char == '"') {
      return _parseString(input, pos);
    } else if (char == '{') {
      return _parseObject(input, pos);
    } else if (char == '[') {
      return _parseArray(input, pos);
    } else if (char == 't' || char == 'f') {
      return _parseBoolean(input, pos);
    } else if (char == 'n') {
      return _parseNull(input, pos);
    } else if (char == '-' || (char.codeUnitAt(0) >= 48 && char.codeUnitAt(0) <= 57)) {
      return _parseNumber(input, pos);
    }

    throw FormatException('Unexpected character: $char', input, pos);
  }

  (String, int) _parseString(String input, int pos) {
    pos++; // skip opening quote
    final buffer = StringBuffer();

    while (pos < input.length) {
      final char = input[pos];

      if (char == '"') {
        return (buffer.toString(), pos + 1);
      } else if (char == '\\') {
        pos++;
        if (pos >= input.length) {
          throw const FormatException('Unexpected end of string');
        }

        final escaped = input[pos];
        switch (escaped) {
          case '"':
            buffer.write('"');
            break;
          case '\\':
            buffer.write('\\');
            break;
          case '/':
            buffer.write('/');
            break;
          case 'b':
            buffer.write('\b');
            break;
          case 'f':
            buffer.write('\f');
            break;
          case 'n':
            buffer.write('\n');
            break;
          case 'r':
            buffer.write('\r');
            break;
          case 't':
            buffer.write('\t');
            break;
          case 'u':
            pos++;
            final hex = input.substring(pos, pos + 4);
            final codeUnit = int.parse(hex, radix: 16);
            buffer.writeCharCode(codeUnit);
            pos += 3;
            break;
          default:
            throw FormatException('Invalid escape sequence: \\$escaped');
        }
      } else {
        buffer.write(char);
      }

      pos++;
    }

    throw const FormatException('Unterminated string');
  }

  (Map<String, dynamic>, int) _parseObject(String input, int pos) {
    pos++; // skip opening brace
    final obj = <String, dynamic>{};

    pos = _skipWhitespace(input, pos);

    if (pos < input.length && input[pos] == '}') {
      return (obj, pos + 1);
    }

    while (pos < input.length) {
      pos = _skipWhitespace(input, pos);

      final (key, keyPos) = _parseString(input, pos);
      pos = keyPos;

      pos = _skipWhitespace(input, pos);
      if (pos >= input.length || input[pos] != ':') {
        throw const FormatException('Expected colon');
      }

      pos = _skipWhitespace(input, pos + 1);

      final (value, valuePos) = _parseValue(input, pos);
      obj[key] = value;
      pos = valuePos;

      pos = _skipWhitespace(input, pos);

      if (pos < input.length && input[pos] == ',') {
        pos = _skipWhitespace(input, pos + 1);
      } else if (pos < input.length && input[pos] == '}') {
        return (obj, pos + 1);
      } else {
        throw const FormatException('Expected comma or closing brace');
      }
    }

    throw const FormatException('Unterminated object');
  }

  (List<dynamic>, int) _parseArray(String input, int pos) {
    pos++; // skip opening bracket
    final array = <dynamic>[];

    pos = _skipWhitespace(input, pos);

    if (pos < input.length && input[pos] == ']') {
      return (array, pos + 1);
    }

    while (pos < input.length) {
      pos = _skipWhitespace(input, pos);

      final (value, valuePos) = _parseValue(input, pos);
      array.add(value);
      pos = valuePos;

      pos = _skipWhitespace(input, pos);

      if (pos < input.length && input[pos] == ',') {
        pos = _skipWhitespace(input, pos + 1);
      } else if (pos < input.length && input[pos] == ']') {
        return (array, pos + 1);
      } else {
        throw const FormatException('Expected comma or closing bracket');
      }
    }

    throw const FormatException('Unterminated array');
  }

  (bool, int) _parseBoolean(String input, int pos) {
    if (input.startsWith('true', pos)) {
      return (true, pos + 4);
    } else if (input.startsWith('false', pos)) {
      return (false, pos + 5);
    }

    throw const FormatException('Invalid boolean');
  }

  (Null, int) _parseNull(String input, int pos) {
    if (input.startsWith('null', pos)) {
      return (null, pos + 4);
    }

    throw const FormatException('Invalid null');
  }

  (num, int) _parseNumber(String input, int pos) {
    final regex = RegExp(r'-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?');
    final match = regex.matchAsPrefix(input, pos);

    if (match == null) {
      throw const FormatException('Invalid number');
    }

    final numberStr = match.group(0) ?? '';
    final number = num.parse(numberStr);

    return (number, pos + numberStr.length);
  }

  int _skipWhitespace(String input, int pos) {
    while (pos < input.length) {
      final char = input[pos];
      if (char == ' ' || char == '\t' || char == '\n' || char == '\r') {
        pos++;
      } else {
        break;
      }
    }

    return pos;
  }
}
