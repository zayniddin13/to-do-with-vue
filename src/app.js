const { createApp, ref, watch, computed, onMounted } = Vue;
const { debounce } = _;
createApp({
  setup() {
    let list = ref([]);
    let removedList = ref([]);
    const message = ref("");
    counter = ref(1);
    const step = ref(1);
    const input = ref();
    onMounted(() => {
      input.value.focus();
    });
    let newDrag;
    let remDrag;
    function rmHandleDragStart(i) {
      remDrag = i;
    }
    function handleDragStart(i) {
      newDrag = i;
    }
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    function handleDrop(i) {
      let item = list.value[i];
      list.value[i] = list.value[newDrag];
      list.value[newDrag] = item;
    }
    function rmHandleDrop(i) {
      console.log('item dropped');
      let remItem = removedList.value[i];
      removedList.value[i] = removedList.value[remDrag];
      removedList.value[remDrag] = remItem;
    }
    function addTodo() {
      if (message.value.trim() == "") {
        alert("please write something!!!");
        message.value = "";
      } else {
        list.value.unshift({
          id: counter.value,
          title: message.value,
          isCompleted: false,
          checked: false,
        });
        counter.value++;
        message.value = "";
        step.value = 1;
        saveTask();
      }
    }
    function clearTask() {
      list.value = [];
      removedList.value = [];
      localStorage.clear("plan");
      localStorage.clear("removed");
    }
    let timeId;
    function doneTap(id) {
      let item = list.value.find((el) => el.id === id);
      item.checked = !item.checked;
      console.log(item.checked);

      if (item.checked) {
        console.log("a");
        console.log(item.isCompleted);
        timeId = setTimeout(() => {
          item.isCompleted = true;
        }, 2000);
      } else {
        console.log("b");
        clearTimeout(timeId);
        item.checked = false;
        item.isCompleted = false;
      }
      saveTask();
    }
    function removedTab(id) {
      removedList.value.unshift(list.value.find((item) => item.id == id));
      console.log(removedList.value);
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
    const debouncedSaveTask = debounce(saveTask, 1000);
    function editTask(i) {
      debouncedSaveTask();
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
      input,
      handleDragStart,
      handleDragOver,
      handleDrop,
      rmHandleDragStart,
      rmHandleDrop,
    };
  },
}).mount("#container");
