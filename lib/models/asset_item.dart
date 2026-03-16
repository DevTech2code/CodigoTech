class AssetItem {
  const AssetItem({
    required this.id,
    required this.assetCode,
    required this.assetType,
    required this.brand,
    required this.model,
    required this.status,
  });

  final int id;
  final String assetCode;
  final String assetType;
  final String brand;
  final String model;
  final String status;

  factory AssetItem.fromJson(Map<String, dynamic> json) {
    return AssetItem(
      id: _toInt(json['id']),
      assetCode: '${json['assetCode'] ?? ''}',
      assetType: '${json['assetType'] ?? ''}',
      brand: '${json['brand'] ?? ''}',
      model: '${json['model'] ?? ''}',
      status: '${json['status'] ?? ''}',
    );
  }

  static int _toInt(dynamic value) {
    if (value is int) {
      return value;
    }
    return int.tryParse('$value') ?? 0;
  }
}
