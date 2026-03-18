class ApiConstants {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://asset-app-back.onrender.com',
  );

  static const String contactsSheetCsvUrl = String.fromEnvironment(
    'CONTACTS_SHEET_CSV_URL',
    defaultValue:
        'https://docs.google.com/spreadsheets/d/1E3ZcRgX1-z-Lr7VqVRLMFs3XnGD4LS7i/export?format=csv&gid=1636730920',
  );

  static const Duration requestTimeout = Duration(seconds: 25);

  static const String authLoginPath = '/auth/login';
  static const String assetsByPersonPath = '/assets/grouped/by-person';
}
