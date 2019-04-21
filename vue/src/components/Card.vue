<template>
  <div class="card">
    <div class="c-header">
      <div class="color-0" v-show="card_data.status == 0"></div>
      <div class="color-1" v-show="card_data.status == 1"></div>
      <div class="color-2" v-show="card_data.status == 2"></div>
      <div class="color-3" v-show="card_data.status == 3"></div>
    </div>
    <div class="c-main">
      <div class="c-title">
        {{card_data.task}}
      </div>
        <div class="c-description">
          Desc: {{card_data.description}}
          </div>
        

      <!-- <div class="c-description">status: {{card_data.status}}</div> -->
    </div>
    <div class="c-footer">
      <div class="div">PIC: {{card_data.pic}}</div>

      <div>
        <b-button
          variant="primary"
          size="sm"
          class="button-so-small"
          :disabled="card_data.status <= 0"
          @click="moveLeft(card_data.id)"
        >
          <i class="fas fa-angle-left"></i>
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          class="button-so-small"
          :disabled="card_data.status >= 3"
          @click="moveRight(card_data.id)"
        >
          <i class="fas fa-angle-right"></i>
        </b-button>
        <b-button v-b-modal.modal-edit variant="primary" size="sm" class="button-so-small" @click="emitData">
        <!-- <b-button @click="emitOpenModal" variant="primary" size="sm" class="button-so-small"> -->
          <i class="far fa-edit"></i> Task
        </b-button>
      </div>
    </div>
    <!-- <ModalEdit /> -->
  </div>
</template>


<script>
import ModalEdit from "@/components/ModalEdit.vue";
import db from "@/api/firebase.js";

export default {
  props: ["card_data"],
  name: "Card",
  data() {
    return {
      emit_data: this.card_data
    };
  },
  components: {
    ModalEdit
  },
  methods: {
    moveRight(id) {
      // console.log(id)
      db.collection("kanban")
        .doc(id)
        .update({
          status: this.card_data.status + 1
        })
        .then(() => {
          console.log("moved to the right");
        })
        .catch(err => {
          console.log(err);
        });
    },
    moveLeft(id) {
      // console.log(id)
      db.collection("kanban")
        .doc(id)
        .update({
          status: this.card_data.status - 1
        })
        .then(() => {
          console.log("moved to the left");
        })
        .catch(err => {
          console.log(err);
        });
    },
    emitData() {
      // console.log(this.emit_data)
      // console.log("emit dataaaah")
      this.$emit('update:single-data', this.emit_data)
    }
  }
};
</script>
<style scoped>
.btn-sm {
  padding: 0.1rem 0.5rem;
  font-size: 0.675rem;
  line-height: 1;
  border-radius: 0.2rem;
  height: 20px;
  margin-right: 3px;
}

.card {
  border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5);
  /* margin: 5px; */
  margin-bottom: 10px;
  display: flex;
}

.color-0,
.color-1,
.color-2,
.color-3 {
  height: 100%;
  width: 100%;
  background-color: #a753b1;
  border-radius: 5px;
  margin: 2px;
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


.c-title {
  width: 100%;
  font-size: 1.8rem;
}
.c-description {
  width: 100%;
  font-size: 0.65rem;
}


.c-header {
  padding: 5px;
  font-size: 0.5vw;
  height: 20px;
  flex-grow: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.c-main {
  padding-left: 8px;
  flex-grow: 1;
  /* display: flex;
  justify-content:flex-start; */
  text-align:left;
  overflow: hidden;
}
.c-footer {
  height: 30px;
  padding: 3px;
  flex-grow: 0;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
</style>
