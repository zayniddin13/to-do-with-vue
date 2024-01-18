const { createApp, ref, watch, computed } = Vue;

createApp({
  setup() {
    let list = ref([]);
    let removedList = ref([]);
    const message = ref("");
    counter = ref(1);
    const step = ref(1);
    function addTodo() {
      list.value.unshift({
        id: counter.value,
        title: message.value,
        isCompleted: false,
      });
      counter.value++;
      message.value = "";
      step.value = 1;
      saveTask();
    }
    function clearTask() {
      list.value = [];
      localStorage.clear("plan");
      localStorage.clear("removed");
    }
    function getNewsList() {
      return [...list.value.filter(el=> !el.isCompleted)]
    }
    function doneTap(id) {
      let item = list.value.find(el => el.id === id)
      item.isCompleted = !item.isCompleted
      // if (!list.value[inx].isCompleted) {
      //    list.value[inx].isCompleted = !list.value[inx].isCompleted;
      //   // setTimeout(() => {
         
      //   // }, 2000);
      // } else {
      //   list.value[inx].isCompleted = !list.value[inx].isCompleted;
      // }
      saveTask();
    }
    function removedTab(id) {
      removedList.value.unshift(list.value.find((item) => item.id == id));
      list.value = list.value.filter((item) => item.id != id);
      saveTask();
    }
    function forgeting(id) {
      const newArr = ref([]);

      removedList.value.forEach((item) => {
        newArr.value.push(item);
      });
      removedList.value = newArr.value.filter((item) => item.id != id);
    }
    function editTask(i) {
      console.log(list.value[i]);
      saveTask();
    }

    function saveTask() {
      localStorage.setItem("plan", JSON.stringify(list.value));
      localStorage.setItem("removed", JSON.stringify(removedList.value));
    }
    function getTask() {
      let localPlan = JSON.parse(localStorage.getItem("plan"));
      if (localPlan !== null) {
        localPlan.forEach((item) => {
          list.value.push(item);
        });
      }
      let removedPlan = JSON.parse(localStorage.getItem("removed"));
      if (removedPlan !== null) {
        removedPlan.forEach((item) => {
          removedList.value.push(item);
        });
      }
    }
    getTask();
    return {
      addTodo,
      message,
      list,
      clearTask,
      doneTap,
      removedTab,
      step,
      removedList,
      forgeting,
      saveTask,
      getTask,
      editTask,
      getNewsList,
    };
  },
}).mount("#container");
