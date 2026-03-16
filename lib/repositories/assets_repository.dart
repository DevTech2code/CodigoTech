import 'package:codigotech/models/person_assets_group.dart';
import 'package:codigotech/services/assets_remote_service.dart';

abstract class AssetsRepository {
  Future<List<PersonAssetsGroup>> fetchAssetsByPerson({required String token});
}

class AssetsRepositoryImpl implements AssetsRepository {
  AssetsRepositoryImpl({required this.remoteService});

  final AssetsRemoteService remoteService;

  @override
  Future<List<PersonAssetsGroup>> fetchAssetsByPerson({required String token}) {
    return remoteService.getAssetsGroupedByPerson(token: token);
  }
}
