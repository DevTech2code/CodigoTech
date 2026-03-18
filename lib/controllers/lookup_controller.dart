  import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/core/utils/code_matcher.dart';
import 'package:codigotech/models/asset_lookup_match.dart';
  import 'package:codigotech/models/contact_entry.dart';
import 'package:codigotech/models/person_assets_group.dart';
import 'package:codigotech/repositories/assets_repository.dart';
import 'package:flutter/material.dart';

class LookupController extends ChangeNotifier {
  LookupController({required AssetsRepository repository})
    : _repository = repository;

  final AssetsRepository _repository;

  List<PersonAssetsGroup> _groups = const [];
  List<ContactEntry> _contacts = const [];
  List<PersonAssetsGroup> _nameResults = const [];
  List<AssetLookupMatch> _codeResults = const [];
  List<ContactEntry> _contactResults = const [];

  bool _isLoading = false;
  bool _hasLoaded = false;
  String _nameQuery = '';
  String _codeQuery = '';
  String _contactQuery = '';
  String? _errorMessage;
  String? _contactsErrorMessage;
  DateTime? _lastUpdatedAt;

  List<PersonAssetsGroup> get groups => _groups;
  List<ContactEntry> get contacts => _contacts;
  List<PersonAssetsGroup> get nameResults => _nameResults;
  List<AssetLookupMatch> get codeResults => _codeResults;
  List<ContactEntry> get contactResults => _contactResults;
  bool get isLoading => _isLoading;
  bool get hasLoaded => _hasLoaded;
  String get nameQuery => _nameQuery;
  String get codeQuery => _codeQuery;
  String get contactQuery => _contactQuery;
  String? get errorMessage => _errorMessage;
  String? get contactsErrorMessage => _contactsErrorMessage;
  DateTime? get lastUpdatedAt => _lastUpdatedAt;

  Future<void> load({required String token, bool forceRefresh = false}) async {
    if (_hasLoaded && !forceRefresh) {
      _applyFilters();
      notifyListeners();
      return;
    }

    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _groups = await _repository.fetchAssetsByPerson(token: token);
      _contactsErrorMessage = null;
      try {
        _contacts = await _repository.fetchContacts();
      } on AppException catch (error) {
        _contacts = const [];
        _contactsErrorMessage = error.message;
      } catch (_) {
        _contacts = const [];
        _contactsErrorMessage =
            'Unexpected error while loading name-number sheet.';
      }

      _hasLoaded = true;
      _lastUpdatedAt = DateTime.now();
      _applyFilters();
    } on AppException catch (error) {
      _errorMessage = error.message;
    } catch (_) {
      _errorMessage = 'Unexpected error while loading assets.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void setNameQuery(String value) {
    _nameQuery = value;
    _applyNameFilter();
    notifyListeners();
  }

  void setCodeQuery(String value) {
    _codeQuery = value;
    _applyCodeFilter();
    notifyListeners();
  }

  void setContactQuery(String value) {
    _contactQuery = value;
    _applyContactFilter();
    notifyListeners();
  }

  void clear() {
    _groups = const [];
    _contacts = const [];
    _nameResults = const [];
    _codeResults = const [];
    _contactResults = const [];
    _isLoading = false;
    _hasLoaded = false;
    _nameQuery = '';
    _codeQuery = '';
    _contactQuery = '';
    _errorMessage = null;
    _contactsErrorMessage = null;
    _lastUpdatedAt = null;
    notifyListeners();
  }

  void _applyFilters() {
    _applyNameFilter();
    _applyCodeFilter();
    _applyContactFilter();
  }

  void _applyNameFilter() {
    final query = _nameQuery.trim().toLowerCase();

    if (query.isEmpty) {
      _nameResults = _groups
          .where((group) => group.assets.isNotEmpty)
          .toList(growable: false);
      return;
    }

    _nameResults = _groups
        .where((group) {
          final byName = group.person.name.toLowerCase().contains(query);
          final byUsername = group.person.username.toLowerCase().contains(
            query,
          );
          return byName || byUsername;
        })
        .toList(growable: false);
  }

  void _applyCodeFilter() {
    final query = _codeQuery.trim();

    if (query.isEmpty) {
      _codeResults = const [];
      return;
    }

    final matches = <AssetLookupMatch>[];
    for (final group in _groups) {
      for (final asset in group.assets) {
        if (CodeMatcher.matches(assetCode: asset.assetCode, query: query)) {
          matches.add(
            AssetLookupMatch(
              ownerName: group.person.name,
              ownerUsername: group.person.username,
              asset: asset,
            ),
          );
        }
      }
    }

    _codeResults = matches;
  }

  void _applyContactFilter() {
    final query = _contactQuery.trim().toLowerCase();

    if (query.isEmpty) {
      _contactResults = _contacts;
      return;
    }

    _contactResults = _contacts
        .where((entry) {
          final byName = entry.name.toLowerCase().contains(query);
          final byNumber = entry.number.toLowerCase().contains(query);
          return byName || byNumber;
        })
        .toList(growable: false);
  }
}
