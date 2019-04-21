<template>
  <div>
    <b-container>
      <b-row class="column-row-header">
        <div class="header-left"></div>
        <div class="header-mid">
          <h1>Kanban Board</h1>
        </div>
        <div class="header-right">
          <!-- modal  button -->
          <b-button v-b-modal.modal-add variant="primary" size="sm">
          <!-- <b-button @click="openModal" variant="primary" size="sm"> -->
            <i class="far fa-plus-square"></i> Task
          </b-button>

          <!-- open this modal add -->
          <ModalAdd />
          <!-- modal edit -->
          <ModalEdit v-bind:opt="opt"/>
        </div>
      </b-row>
      <b-row class="column-row">
        <div class="col-3 board-column">
          

          <b-container fluid class="column-title color-0">Backlogs</b-container>

          <div v-for="w in arrayByStatus[0]" 
          :key="w.id">
            <Card v-bind:card_data="w" @update:single-data="openModal"/>
          </div>

        </div>
        <div class="col-3 board-column">
          <b-container fluid class="column-title color-1">Start</b-container>

          <div v-for="x in arrayByStatus[1]" 
          :key="x.id">
            <Card v-bind:card_data="x" @update:single-data="openModal"/>
          </div>

        </div>
        <div class="col-3 board-column">
          <b-container fluid class="column-title color-2">In Progress</b-container>

  
          <div v-for="y in arrayByStatus[2]" 
          :key="y.id">
            <Card v-bind:card_data="y" @update:single-data="openModal"/>
          </div>

        </div>
        <div class="col-3 board-column">
          <b-container fluid class="column-title color-3">Delivered</b-container>
          <div v-for="z in arrayByStatus[3]" 
          :key="z.id">
            <Card v-bind:card_data="z" @update:single-data="openModal"/>
          </div>

          
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import ModalAdd from '@/components/ModalAdd.vue'
import db from '../api/firebase.js'
import ModalEdit from "@/components/ModalEdit.vue";

export default {
  name: "board",
  mounted() {
    db.collection("kanban")
    .orderBy('createdAt', 'asc')
    .onSnapshot((querySnapshot) => {
        this.arrayData=[]
        this.arrayByStatus = {
          0: [],
          1: [],
          2: [],
          3: [],
        }
          querySnapshot.forEach((doc) => {
          const obj = {...doc.data(), id:doc.id}
          this.arrayData.push(obj) 

          this.arrayByStatus[obj.status].push(obj)
        });
    });
  },
  data() {
    return {
      arrayData:[],
      arrayByStatus: {
        0: [],
        1: [],
        2: [],
        3: [],
      },
      selected: null,
      options: [
        { value: 0, text: "Backlog" },
        { value: 1, text: "Start" },
        { value: 2, text: "On progress" },
        { value: 3, text: "Delivered" },
      ],
      opt: {
        id:"",
        description:"",
        pic:"",
        status:"",
        task:"",
        createdAt:"",
        updatedAt:"",
      }
    };
  },
  methods: {
    divideByStatus() {
      this.arrayData.forEach((el) => {
        console.log(el.status)
        console.log(el.task)
      })
    },
    openModal(data){
      console.log(data)
      this.opt.id = data.id
      this.opt.description = data.description
      this.opt.pic = data.pic
      this.opt.status = data.status
      this.opt.task = data.task
      this.opt.createdAt = data.createdAt
      // console.log("test")
      // this.opt.updatedAt = new Date()
    }
  },
  components: {
    Card,
    ModalAdd,
    ModalEdit,
  }
};
</script>
<style>
.board-column {
  /* border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5); */
}
.column-row-header {
  /* border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.column-row {
  display: flex;
  justify-content: space-evenly;
}

#modal-add {
  text-align:left;
}

.modal-footer {
  padding: 0.3rem;
}

h1 {
  margin-bottom: 0px;
}

.column-title {
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 20px;
}

.color-0 {
  background-color: #a753b1;
}
.color-1 {
  background-color: #fd4e55;
}
.color-2 {
  background-color: #fee416;
}
.color-3 {
  background-color: #02ca70;
}

.header-mid {
  margin-bottom: 10px;
}
</style>

