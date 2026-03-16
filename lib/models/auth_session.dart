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
    final user = (json['user'] as Map<String, dynamic>?) ?? <String, dynamic>{};

    final roleRaw = user['role'];
    var roleName = '';
    if (roleRaw is Map<String, dynamic>) {
      roleName = '${roleRaw['name'] ?? ''}'.trim();
    } else {
      roleName = '$roleRaw'.trim();
    }

    return AuthSession(
      token: '${json['access_token'] ?? ''}',
      userId: _toInt(user['id']),
      username: '${user['username'] ?? ''}',
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

  static int _toInt(dynamic value) {
    if (value is int) {
      return value;
    }
    return int.tryParse('$value') ?? 0;
  }
}
