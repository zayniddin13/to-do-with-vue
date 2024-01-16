const { createApp, ref, watch, computed } = Vue

createApp({
  setup() {
    let list = ref([])
    let removedList= ref([])
    const message = ref('')
    counter = ref(1)
    const step = ref(1)
    function addTodo() {
      list.value.unshift({
        id: counter.value,
        title: message.value,
        isCompleted: false,
        chacked:false
      })
      counter.value++
      message.value = ''
      step.value=1
    }
function clearTask() {
  list.value=[]
}
  function doneTap(inx) {
  list.value[inx].chacked=!list.value[inx].chacked


  if (!list.value[inx].isCompleted) {
    waiting=setTimeout(() => {
      list.value[inx].isCompleted=!list.value[inx].isCompleted 
    }, 2000); 
  } else {
    list.value[inx].isCompleted=!list.value[inx].isCompleted 
  }

 
}
function removedTab(id) {
  removedList.value.unshift(list.value.find(item => item.id == id))
  list.value = list.value.filter(item => item.id != id)
}
function forgeting(id) {
  const newArr = ref([])

  removedList.value.forEach(item => {
    newArr.value.push(item)
  })
  removedList.value = newArr.value.filter(item => item.id != id)
}
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
    }
  }
}).mount('#container')