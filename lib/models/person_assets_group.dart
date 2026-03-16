import 'package:codigotech/models/asset_item.dart';

class PersonSummary {
  const PersonSummary({
    required this.id,
    required this.name,
    required this.username,
  });

  final int id;
  final String name;
  final String username;

  factory PersonSummary.fromJson(Map<String, dynamic> json) {
    return PersonSummary(
      id: _toInt(json['id']),
      name: '${json['name'] ?? ''}',
      username: '${json['username'] ?? ''}',
    );
  }

  static int _toInt(dynamic value) {
    if (value is int) {
      return value;
    }
    return int.tryParse('$value') ?? 0;
  }
}

class PersonAssetsGroup {
  const PersonAssetsGroup({
    required this.person,
    required this.assets,
    required this.count,
  });

  final PersonSummary person;
  final List<AssetItem> assets;
  final int count;

  factory PersonAssetsGroup.fromJson(Map<String, dynamic> json) {
    final rawAssets = (json['assets'] as List?) ?? <dynamic>[];
    return PersonAssetsGroup(
      person: PersonSummary.fromJson(
        (json['person'] as Map<String, dynamic>?) ?? <String, dynamic>{},
      ),
      assets: rawAssets
          .whereType<Map<String, dynamic>>()
          .map(AssetItem.fromJson)
          .toList(growable: false),
      count: _toInt(json['count']),
    );
  }

  static int _toInt(dynamic value) {
    if (value is int) {
      return value;
    }
    return int.tryParse('$value') ?? 0;
  }
}
