import 'package:codigotech/models/contact_entry.dart';
import 'package:codigotech/models/person_assets_group.dart';
import 'package:codigotech/services/assets_remote_service.dart';
import 'package:codigotech/services/contacts_sheet_service.dart';

abstract class AssetsRepository {
  Future<List<PersonAssetsGroup>> fetchAssetsByPerson({required String token});

  Future<List<ContactEntry>> fetchContacts();
}

class AssetsRepositoryImpl implements AssetsRepository {
  AssetsRepositoryImpl({
    required this.remoteService,
    required this.contactsSheetService,
  });

  final AssetsRemoteService remoteService;
  final ContactsSheetService contactsSheetService;

  @override
  Future<List<PersonAssetsGroup>> fetchAssetsByPerson({required String token}) {
    return remoteService.getAssetsGroupedByPerson(token: token);
  }

  @override
  Future<List<ContactEntry>> fetchContacts() {
    return contactsSheetService.fetchContacts();
  }
}
