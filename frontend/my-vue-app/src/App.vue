<template>
  <div class="container">
    <h1>ข้อมูลของฉัน</h1>
    <form @submit.prevent="addData" class="form">
      <div class="form-group">
        <label for="name">ชื่อ *</label>
        <input
          type="text"
          id="name"
          v-model="newData.name"
          placeholder="กรุณากรอกชื่อ"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">คำอธิบาย *</label>
        <input
          type="text"
          id="description"
          v-model="newData.description"
          placeholder="กรุณากรอกคำอธิบาย"
          required
        />
      </div>
      <button type="submit" class="submit-button">เพิ่มข้อมูล</button>
    </form>

    <!-- แสดงข้อความเมื่อบันทึกข้อมูลสำเร็จ -->
    <div v-if="showSuccessMessage" class="success-message">
      บันทึกข้อมูลสำเร็จ!
    </div>

    <!-- รายการข้อมูล -->
    <div class="data-list">
      <div v-for="(item, index) in data" :key="index" class="data-item">
        <span class="data-name">{{ item.name }}</span>
        <span class="data-description">{{ item.description }}</span>
        <button @click="deleteData(index)" class="delete-button">ลบ</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newData: {
        name: '',
        description: ''
      },
      data: [],
      showSuccessMessage: false
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addData() {
      try {
        const response = await axios.post('http://localhost:5000/api/data', this.newData);
        this.data.push(response.data.data);
        this.newData = { name: '', description: '' };
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    },
    async deleteData(index) {
      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) {
        try {
          await axios.delete(`http://localhost:5000/api/data/${index}`);
          this.data.splice(index, 1); // ลบข้อมูลออกจากรายการ
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
/* ตั้งค่าพื้นฐาน */
body {
  background-color: #f4f4f9;
  font-family: 'Prompt', sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

/* ฟอร์ม */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 600;
  color: #2c3e50;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #42b983;
  outline: none;
}

.submit-button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #369f6e;
}

/* ข้อความสำเร็จ */
.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}

/* รายการข้อมูล */
.data-list {
  margin-top: 30px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.data-name {
  font-weight: 600;
  color: #2c3e50;
}

.data-description {
  color: #666;
}

/* ปุ่มลบ */
.delete-button {
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000;
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }

  .container {
    width: 95%;
    padding: 15px;
    margin: 10px auto;
  }

  .data-item {
    flex-direction: column;
    gap: 5px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5em;
  }

  input {
    font-size: 0.9em;
  }

  .submit-button {
    font-size: 0.9em;
  }
}
</style>