import 'package:codigotech/models/asset_item.dart';

class AssetLookupMatch {
  const AssetLookupMatch({
    required this.ownerName,
    required this.ownerUsername,
    required this.asset,
  });

  final String ownerName;
  final String ownerUsername;
  final AssetItem asset;
}
