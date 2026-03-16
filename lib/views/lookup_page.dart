import 'package:codigotech/controllers/auth_controller.dart';
import 'package:codigotech/controllers/lookup_controller.dart';
import 'package:codigotech/models/person_assets_group.dart';
import 'package:codigotech/views/widgets/empty_state.dart';
import 'package:flutter/material.dart';

class LookupPage extends StatefulWidget {
  const LookupPage({
    super.key,
    required this.authController,
    required this.lookupController,
  });

  final AuthController authController;
  final LookupController lookupController;

  @override
  State<LookupPage> createState() => _LookupPageState();
}

class _LookupPageState extends State<LookupPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  Future<void> _loadData({bool forceRefresh = false}) async {
    final token = widget.authController.session?.token;
    if (token == null || token.isEmpty) {
      return;
    }

    await widget.lookupController.load(
      token: token,
      forceRefresh: forceRefresh,
    );
  }

  Future<void> _logout() async {
    await widget.authController.logout();
    widget.lookupController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: AnimatedBuilder(
        animation: Listenable.merge([
          widget.authController,
          widget.lookupController,
        ]),
        builder: (context, _) {
          final lookup = widget.lookupController;

          return Scaffold(
            appBar: AppBar(
              title: const Text('Consulta de Activos'),
              actions: [
                IconButton(
                  tooltip: 'Actualizar',
                  onPressed: lookup.isLoading
                      ? null
                      : () => _loadData(forceRefresh: true),
                  icon: const Icon(Icons.refresh),
                ),
                IconButton(
                  tooltip: 'Cerrar sesion',
                  onPressed: widget.authController.isLoading ? null : _logout,
                  icon: const Icon(Icons.logout),
                ),
              ],
              bottom: const TabBar(
                tabs: [
                  Tab(text: 'Nombre -> Codigo'),
                  Tab(text: 'Codigo -> Nombre'),
                ],
              ),
            ),
            body: Column(
              children: [
                if (lookup.lastUpdatedAt != null)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    color: Theme.of(
                      context,
                    ).colorScheme.surfaceContainerHighest,
                    child: Text(
                      'Ultima actualizacion: ${lookup.lastUpdatedAt}',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ),
                Expanded(
                  child: Stack(
                    children: [
                      TabBarView(
                        children: [
                          _NameLookupTab(controller: lookup),
                          _CodeLookupTab(controller: lookup),
                        ],
                      ),
                      if (lookup.isLoading && !lookup.hasLoaded)
                        const Center(child: CircularProgressIndicator()),
                      if (!lookup.isLoading &&
                          lookup.errorMessage != null &&
                          !lookup.hasLoaded)
                        EmptyState(
                          icon: Icons.cloud_off,
                          title: 'No se pudo cargar la informacion',
                          subtitle: lookup.errorMessage!,
                        ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _NameLookupTab extends StatelessWidget {
  const _NameLookupTab({required this.controller});

  final LookupController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            onChanged: controller.setNameQuery,
            decoration: const InputDecoration(
              labelText: 'Buscar persona',
              hintText: 'Ejemplo: Maria, Juan, usuario01',
              prefixIcon: Icon(Icons.search),
            ),
          ),
          const SizedBox(height: 14),
          Expanded(
            child: controller.nameResults.isEmpty
                ? const EmptyState(
                    icon: Icons.person_search,
                    title: 'Sin resultados',
                    subtitle:
                        'Escribe un nombre de persona para ver sus codigos.',
                  )
                : ListView.builder(
                    itemCount: controller.nameResults.length,
                    itemBuilder: (context, index) {
                      final group = controller.nameResults[index];
                      return _PersonCard(group: group);
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class _PersonCard extends StatelessWidget {
  const _PersonCard({required this.group});

  final PersonAssetsGroup group;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              group.person.name,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 2),
            Text('@${group.person.username}'),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: group.assets
                  .map((asset) => Chip(label: Text(asset.assetCode)))
                  .toList(growable: false),
            ),
          ],
        ),
      ),
    );
  }
}

class _CodeLookupTab extends StatelessWidget {
  const _CodeLookupTab({required this.controller});

  final LookupController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            onChanged: controller.setCodeQuery,
            decoration: const InputDecoration(
              labelText: 'Buscar codigo',
              hintText: 'Ejemplo: 001 o lapt-001',
              prefixIcon: Icon(Icons.qr_code_scanner),
            ),
          ),
          const SizedBox(height: 14),
          Expanded(
            child: controller.codeQuery.trim().isEmpty
                ? const EmptyState(
                    icon: Icons.qr_code,
                    title: 'Escribe un codigo',
                    subtitle: 'Si escribes 001 tambien encontrara lapt-001.',
                  )
                : controller.codeResults.isEmpty
                ? const EmptyState(
                    icon: Icons.search_off,
                    title: 'No hay coincidencias',
                    subtitle: 'No se encontro ningun activo con ese codigo.',
                  )
                : ListView.separated(
                    itemCount: controller.codeResults.length,
                    separatorBuilder: (_, index) => const SizedBox(height: 8),
                    itemBuilder: (context, index) {
                      final match = controller.codeResults[index];
                      return Card(
                        child: ListTile(
                          leading: const CircleAvatar(
                            child: Icon(Icons.devices),
                          ),
                          title: Text(match.asset.assetCode),
                          subtitle: Text(
                            '${match.ownerName} (@${match.ownerUsername})',
                          ),
                          trailing: Text(match.asset.status),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
