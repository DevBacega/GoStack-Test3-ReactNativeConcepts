import React, {useState,useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {

  const [repo, setRepo] = useState([]);

  async function handleLikeRepository(id) {
    api.post(`repositories/${id}/like`).then(response =>{
      const indexRepo = repo.findIndex(r => r.id === id);
      const repository = Array.from(repo);
      repository[indexRepo].likes = response.data.likes;
      
      setRepo(repository);
    });
  };

  useEffect(() => {
      api.get('repositories').then(response =>{
        setRepo(response.data)
      });
  },[])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <View style={styles.repositoryContainer}>

        <FlatList
          data={repo}
          keyExtractor={repo => repo.id}
          renderItem={({item: repo})=>(
            <>
              <View style={styles.repoBox}>
                <Text style={styles.repository}>{repo.title}</Text>

                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>
                    ReactJS
                  </Text>
                  <Text style={styles.tech}>
                    Node.js
                  </Text>
                </View>
                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repo.id}`}
                  >
                    {repo.likes} {(repo.likes > 1)? 'curtidas' : 'curtida'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repo.id)}
                  testID={`like-button-${repo.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />
        

        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repoBox: {
    marginBottom: 15,
    backgroundColor: "#e0faff",
    padding: 15,
    borderRadius: 25
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10
    
  },
});
