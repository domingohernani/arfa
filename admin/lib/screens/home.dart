import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late Future<List<Map<String, dynamic>>> furnitureFuture;

  @override
  void initState() {
    super.initState();
    furnitureFuture = getFurnitureCollection();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Furniture Collection'),
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: furnitureFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No furniture found.'));
          } else {
            final furnitureList = snapshot.data!;
            return ListView.builder(
              itemCount: furnitureList.length,
              itemBuilder: (context, index) {
                final furniture = furnitureList[index];
                return ListTile(
                  title: Text(furniture['name'] ?? 'Unknown'),
                  subtitle: Text('Price: \$${furniture['price'] ?? 'N/A'}'),
                );
              },
            );
          }
        },
      ),
    );
  }

  Future<List<Map<String, dynamic>>> getFurnitureCollection() async {
    List<Map<String, dynamic>> furnitureList = [];

    try {
      QuerySnapshot querySnapshot =
          await FirebaseFirestore.instance.collection('furnitures').get();

      for (var doc in querySnapshot.docs) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
        furnitureList.add(data);
      }
    } catch (e) {
      print('Error fetching furniture collection: $e');
    }

    return furnitureList;
  }
}
