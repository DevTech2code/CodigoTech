import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/core/utils/code_matcher.dart';
import 'package:codigotech/models/asset_lookup_match.dart';
import 'package:codigotech/models/person_assets_group.dart';
import 'package:codigotech/repositories/assets_repository.dart';
import 'package:flutter/material.dart';

class LookupController extends ChangeNotifier {
  LookupController({required AssetsRepository repository})
    : _repository = repository;

  final AssetsRepository _repository;

  List<PersonAssetsGroup> _groups = const [];
  List<PersonAssetsGroup> _nameResults = const [];
  List<AssetLookupMatch> _codeResults = const [];

  bool _isLoading = false;
  bool _hasLoaded = false;
  String _nameQuery = '';
  String _codeQuery = '';
  String? _errorMessage;
  DateTime? _lastUpdatedAt;

  List<PersonAssetsGroup> get groups => _groups;
  List<PersonAssetsGroup> get nameResults => _nameResults;
  List<AssetLookupMatch> get codeResults => _codeResults;
  bool get isLoading => _isLoading;
  bool get hasLoaded => _hasLoaded;
  String get nameQuery => _nameQuery;
  String get codeQuery => _codeQuery;
  String? get errorMessage => _errorMessage;
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

  void clear() {
    _groups = const [];
    _nameResults = const [];
    _codeResults = const [];
    _isLoading = false;
    _hasLoaded = false;
    _nameQuery = '';
    _codeQuery = '';
    _errorMessage = null;
    _lastUpdatedAt = null;
    notifyListeners();
  }

  void _applyFilters() {
    _applyNameFilter();
    _applyCodeFilter();
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
}
