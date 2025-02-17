import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, View, Text, Image, Pressable } from "react-native";
import { getPosts } from "@/core/api";
import NoResults from "@/components/global/NoResults";
import { PostCard } from "@/components/post/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch posts from the API
  const fetchPosts = useCallback(async () => {
    try {
      const response = await getPosts();
      setPosts(response.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);



  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  const renderItem = useCallback(({ item }) =>  <PostCard item={item} />, []);

  return (
    <View className=" bg-[#ECECEC]">
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        loading ? (
          <>
          <PostCard.Skeleton />
          <PostCard.Skeleton />
          <PostCard.Skeleton />
          </>
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <NoResults />
          </View>
        )
      }
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
    </View>
  );
};

export default Posts;