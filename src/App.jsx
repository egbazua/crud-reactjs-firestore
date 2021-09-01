import { isTSEntityName } from '@babel/types';
import { useEffect, useState } from 'react';
import { firebase } from './firebase';

function App() {

  const [task, setTask] = useState([]);
  const [taskForm, setTaskForm] = useState('');
 
  useEffect(() => {
    
    const getData = async () => {

      try {
        
        const db = firebase.firestore();
        const data = await db.collection('task').get()
        const dataArray = data.docs.map( (doc) => ({id: doc.id, ...doc.data() }));
        console.log(dataArray);
        setTask(dataArray);

      } catch (error) {
        console.log(error);
      }

    }

    getData();

  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    console.log(task);

    if(!taskForm.trim()){
      return console.log('Empty');
    }

    try {
      
      const db = firebase.firestore();
      const newTask = {
        name: taskForm,
        date: Date.now()
      }

      const data = await db.collection('task').add(newTask)

    } catch (error) {
      console.log(error);
    }

    console.log(taskForm);
  }

  return (
    <div className="container">
      <h1 className="text-center mt-1"> CRUD - REACTJS AND FIRESTORE</h1>
      <hr className="mb-4"/>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              task.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Form</h3>
          <form onSubmit={addTask}>
            <input onChange={e => setTaskForm(e.target.value)} value={taskForm} type="text" placeholder="Enter Task" className="form-control mb-2" />
            <button className="btn btn-dark w-100" type="submit" >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;