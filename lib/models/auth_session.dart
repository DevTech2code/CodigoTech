class AuthSession {
  const AuthSession({
    required this.token,
    required this.userId,
    required this.username,
    required this.role,
  });

  final String token;
  final int userId;
  final String username;
  final String role;

  factory AuthSession.fromLoginResponse(Map<String, dynamic> json) {
    final data = _asMap(json['data']);
    final user = _extractUser(json, data);

    final roleName = _extractRoleName(
      user['role'] ?? user['roleName'] ?? data['role'] ?? json['role'],
    );

    return AuthSession(
      token: _firstNonEmptyString([
        json['access_token'],
        json['accessToken'],
        json['token'],
        data['access_token'],
        data['accessToken'],
        data['token'],
      ]),
      userId: _toInt(
        user['id'] ?? user['userId'] ?? data['userId'] ?? json['userId'],
      ),
      username: _firstNonEmptyString([
        user['username'],
        user['userName'],
        data['username'],
        json['username'],
      ]),
      role: roleName,
    );
  }

  factory AuthSession.fromStorage(Map<String, dynamic> json) {
    return AuthSession(
      token: '${json['token'] ?? ''}',
      userId: _toInt(json['userId']),
      username: '${json['username'] ?? ''}',
      role: '${json['role'] ?? ''}',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'token': token,
      'userId': userId,
      'username': username,
      'role': role,
    };
  }

  static Map<String, dynamic> _extractUser(
    Map<String, dynamic> root,
    Map<String, dynamic> data,
  ) {
    final rootUser = _asMap(root['user']);
    if (rootUser.isNotEmpty) {
      return rootUser;
    }

    final dataUser = _asMap(data['user']);
    if (dataUser.isNotEmpty) {
      return dataUser;
    }

    final rootPerson = _asMap(root['person']);
    if (rootPerson.isNotEmpty) {
      return rootPerson;
    }

    final dataPerson = _asMap(data['person']);
    if (dataPerson.isNotEmpty) {
      return dataPerson;
    }

    return <String, dynamic>{};
  }

  static Map<String, dynamic> _asMap(dynamic value) {
    if (value is Map<String, dynamic>) {
      return value;
    }
    if (value is Map) {
      return value.map((key, entryValue) => MapEntry('$key', entryValue));
    }
    return <String, dynamic>{};
  }

  static String _extractRoleName(dynamic roleRaw) {
    if (roleRaw is Map || roleRaw is Map<String, dynamic>) {
      final roleMap = _asMap(roleRaw);
      return _firstNonEmptyString([roleMap['name'], roleMap['role']]);
    }
    return _firstNonEmptyString([roleRaw]);
  }

  static String _firstNonEmptyString(List<dynamic> candidates) {
    for (final candidate in candidates) {
      final value = '$candidate'.trim();
      if (value.isNotEmpty && value.toLowerCase() != 'null') {
        return value;
      }
    }
    return '';
  }

  static int _toInt(dynamic value) {
    if (value is int) {
      return value;
    }
    return int.tryParse('$value') ?? 0;
  }
}
