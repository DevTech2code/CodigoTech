class CodeMatcher {
  static bool matches({required String assetCode, required String query}) {
    final normalizedCode = _normalize(assetCode);
    final normalizedQuery = _normalize(query);

    if (normalizedQuery.isEmpty) {
      return false;
    }

    if (normalizedCode.contains(normalizedQuery)) {
      return true;
    }

    final isNumericQuery = RegExp(r'^\d+$').hasMatch(normalizedQuery);
    if (isNumericQuery) {
      final padded = normalizedQuery.padLeft(3, '0');
      return normalizedCode.endsWith('-$padded') ||
          normalizedCode.contains('-$padded') ||
          normalizedCode.contains(padded);
    }

    return false;
  }

  static String _normalize(String value) {
    return value.trim().toLowerCase();
  }
}
