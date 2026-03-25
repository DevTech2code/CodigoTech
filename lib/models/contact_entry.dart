class ContactEntry {
  const ContactEntry({
    required this.name,
    required this.number,
    this.number2 = '',
    this.ipPhone = '',
  });

  final String name;
  final String number;
  final String number2;
  final String ipPhone;
}
