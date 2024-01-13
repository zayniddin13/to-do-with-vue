const { createApp, ref, watch } = Vue

createApp({
  setup() {
    let list = ref([])
    const message = ref('')
    counter = ref(1)

    function addTodo() {
      list.value.unshift({
        id: counter.value,
        title: message.value,
        isCompleted: false,
      })
      counter.value++
      console.log(list.value)
      message.value = ''
    }
function clearTask() {
  list.value=[]
}
function doneTap(id) {
  console.log('id: ',id);
  console.log(list.value[id-1].title);
  // list.value.isCompleted=!list.value.isCompleted

}
    return {
      addTodo,
      message,
      list,
      clearTask,
     doneTap
    }
  },
}).mount('#container')