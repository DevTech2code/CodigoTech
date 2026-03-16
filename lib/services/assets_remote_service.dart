import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/core/network/api_client.dart';
import 'package:codigotech/models/person_assets_group.dart';

abstract class AssetsRemoteService {
  Future<List<PersonAssetsGroup>> getAssetsGroupedByPerson({
    required String token,
  });
}

class AssetsRemoteServiceImpl implements AssetsRemoteService {
  AssetsRemoteServiceImpl({required this.apiClient});

  final ApiClient apiClient;

  @override
  Future<List<PersonAssetsGroup>> getAssetsGroupedByPerson({
    required String token,
  }) async {
    final response = await apiClient.getJson(
      ApiConstants.assetsByPersonPath,
      token: token,
    );

    final list = _extractList(response);
    return list
        .whereType<Map<String, dynamic>>()
        .map(PersonAssetsGroup.fromJson)
        .toList(growable: false);
  }

  List<dynamic> _extractList(dynamic payload) {
    if (payload is List) {
      return payload;
    }

    if (payload is Map<String, dynamic> && payload['data'] is List) {
      return payload['data'] as List<dynamic>;
    }

    throw AppException('Unexpected payload while reading assets by person.');
  }
}
