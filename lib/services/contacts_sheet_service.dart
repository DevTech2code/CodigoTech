import 'dart:async';
import 'dart:convert';

import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/models/contact_entry.dart';
import 'package:csv/csv.dart';
import 'package:http/http.dart' as http;

abstract class ContactsSheetService {
  Future<List<ContactEntry>> fetchContacts();
}

class GoogleSheetsContactsService implements ContactsSheetService {
  GoogleSheetsContactsService({http.Client? client})
    : _client = client ?? http.Client();

  final http.Client _client;

  static const Set<String> _nameHeaders = {
    'nombre',
    'nombres',
    'name',
    'persona',
    'usuario',
  };

  static const Set<String> _numberHeaders = {
    'numero',
    'numero de telefono',
    'telefono',
    'celular',
    'movil',
    'phone',
    'number',
  };

  @override
  Future<List<ContactEntry>> fetchContacts() async {
    final rawUrl = ApiConstants.contactsSheetCsvUrl.trim();
    if (rawUrl.isEmpty) {
      return const [];
    }

    final uri = Uri.tryParse(rawUrl);
    if (uri == null || !uri.hasScheme || !uri.hasAuthority) {
      throw AppException(
        'CONTACTS_SHEET_CSV_URL no es valida. Usa un enlace export CSV de Google Sheets.',
      );
    }

    final response = await _loadSheet(uri);
    final csvContent = utf8.decode(response.bodyBytes);
    final rows = const CsvToListConverter(
      shouldParseNumbers: false,
      eol: '\n',
    ).convert(csvContent);

    if (rows.isEmpty) {
      return const [];
    }

    final headerRow = rows.first.map((cell) => '$cell').toList(growable: false);
    final nameIndex = _findColumnIndex(headerRow, _nameHeaders);
    final numberIndex = _findColumnIndex(headerRow, _numberHeaders);

    if (nameIndex == -1 || numberIndex == -1) {
      throw AppException(
        'No se encontraron columnas de nombre y numero en el Excel. Encabezados esperados: Nombre y Numero.',
      );
    }

    final contacts = <ContactEntry>[];
    for (final row in rows.skip(1)) {
      if (row.isEmpty) {
        continue;
      }

      final name = _readCell(row, nameIndex).trim();
      final number = _readCell(row, numberIndex).trim();
      if (name.isEmpty && number.isEmpty) {
        continue;
      }

      contacts.add(ContactEntry(name: name, number: number));
    }

    return contacts;
  }

  Future<http.Response> _loadSheet(Uri uri) async {
    try {
      final response = await _client
          .get(uri, headers: const {'Accept': 'text/csv'})
          .timeout(ApiConstants.requestTimeout);

      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw AppException(
          'No se pudo leer el Excel de Google Drive (HTTP ${response.statusCode}).',
        );
      }

      final contentType = response.headers['content-type'] ?? '';
      if (contentType.contains('text/html')) {
        throw AppException(
          'El Excel requiere permisos. Publica la hoja o habilita acceso con enlace para poder leerla desde la app.',
        );
      }

      return response;
    } on AppException {
      rethrow;
    } on TimeoutException {
      throw AppException('Tiempo de espera agotado al leer el Excel.');
    } on http.ClientException catch (error) {
      throw AppException('Error de red al leer el Excel: ${error.message}');
    } catch (_) {
      throw AppException('Error inesperado leyendo el Excel de Google Drive.');
    }
  }

  int _findColumnIndex(List<String> headers, Set<String> candidates) {
    for (var index = 0; index < headers.length; index++) {
      final normalized = _normalizeHeader(headers[index]);
      if (candidates.contains(normalized)) {
        return index;
      }
    }

    return -1;
  }

  String _readCell(List<dynamic> row, int index) {
    if (index < 0 || index >= row.length) {
      return '';
    }

    return '${row[index]}';
  }

  String _normalizeHeader(String value) {
    final lowered = value.trim().toLowerCase();
    return lowered
        .replaceAll('á', 'a')
        .replaceAll('é', 'e')
        .replaceAll('í', 'i')
        .replaceAll('ó', 'o')
        .replaceAll('ú', 'u')
        .replaceAll(RegExp(r'\s+'), ' ')
        .trim();
  }
}
