import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

import { GoalItem } from "./components/GoalItem";
import { GoalInput } from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [...currentGoals, goalTitle]);
  };

  const removeGoalHandler = goalIndex => {
    setCourseGoals(currentGoals => {
      return currentGoals.splice(goalIndex, 1);
    });
  };
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={courseGoals}
        renderItem={(itemData, i) => (
          <GoalItem
            title={itemData.item}
            onDelete={removeGoalHandler}
            goalIndex={itemData.item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
