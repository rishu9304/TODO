import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import {useCookies} from 'react-cookie';
import {TodoAdd,GetTodo,RemoveTodo,UpdateTodo} from '../actions/todoAction';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width				  : '600px',
  }
};



function Todo() {
	var subtitle;
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [category,setCategory] = useState('Updates')
	const [title,setTitle] = useState('')
	const [desc,setDesc] =  useState('')
	const [update,setUpdate] = useState({})
	const [updatetitle,setUpdatetitle] = useState('')
	const [updatedesc,setUpdatedesc] =  useState('')
	const [updatecat,setUpdatecat] =  useState('')
	const [cookie,setCookie] =  useCookies(['token'])
	const token =  cookie['token']
	const todo = useSelector(state => state.todo.todo);
	const dispatch = useDispatch();

	if(cookie['token']===undefined || cookie['token']===''){
		window.location = '/login'
	}

	useEffect(()=>{
		dispatch(GetTodo(token))
		console.log("t1",todo)
	},[])

	  function openModal(item) {
	    setIsOpen(true);
	    setUpdate(item)
	    setUpdatetitle(item.title)
	    setUpdatedesc(item.descripion)
	    setUpdatecat(item.category__name)
	  }
	 

	  function closeModal(){
	    setIsOpen(false);
	  }

	const addTodo = () => {
		dispatch(TodoAdd(token,{category:category,title:title,desc:desc}));	
		setTitle('')
		setDesc('')
	}

	const deleteTodo = (id) => {
		dispatch(RemoveTodo(id,token))
	}	

	const updateTodo = () =>{
		dispatch(UpdateTodo(token,{id:update.id,title:updatetitle,descripion:updatedesc,category__name:updatecat}))
		closeModal()
	}

	return (
		<div>
			<Navbar/>
			<div className='row'>
				<div className='col-5 mt-3 ml-2'>
					<h4>Add Todo</h4>
					<form>
						<div className="form-group">
							<label>Category</label>
							<select className='form-control' onChange={(evt)=>setCategory(evt.target.value)}>
								<option value='Updates'>Updates</option>
								<option value='Important'>Important</option>
							</select>
						</div>
						<div className="form-group">
							<input type='text' className='form-control' value={title} onChange={(evt)=>setTitle(evt.target.value)} name='title' placeholder='title'/>
						</div>
						<div className="form-group">
							<textarea className='form-control' name='title' value = {desc} onChange={(evt)=>setDesc(evt.target.value)} placeholder='Description' row='4'/>
						</div>
						<input type="button" name="Add Todo" className="btn btn-primary" value="Add Todo" onClick={addTodo}/>
					</form>
				</div>
				<div className='col-6 mt-3 mr-2'>
					<h4>Todo List</h4>
					{todo && todo.map((item,key)=>(
							<div key={key} className='shadow-lg p-3 mb-2 bg-white rounded'>
								<h6 className='float-none'>Category: {item.category__name}</h6>
								<p className='float-none'><span>Title: </span>{item.title}</p>
								<p className='float-none'><span>Description: </span>{item.descripion}</p>
								<button className='btn btn-danger mr-2' onClick={()=>deleteTodo(item.id)}>Delete</button>
								<button className='btn btn-primary' onClick={()=>openModal(item)}>Edit</button>
							</div>
						))}
				</div>
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
					<h4>Update Todo</h4>
					<form>
						<div className="form-group">
							<label>Category</label>
							<select className='form-control' value={updatecat} onChange={(evt)=>setUpdatecat(evt.target.value)}>
								<option value='Updates'>Updates</option>
								<option value='Important'>Important</option>
							</select>
						</div>
						<div className="form-group">
							<input type='text' className='form-control' value={updatetitle} onChange={(evt)=>setUpdatetitle(evt.target.value)} name='title' placeholder='title'/>
						</div>
						<div className="form-group">
							<textarea className='form-control' name='title' value = {updatedesc} onChange={(evt)=>setUpdatedesc(evt.target.value)} placeholder='Description' row='4'/>
						</div>
						<input type="button" name="Update Todo" className="btn btn-primary mr-2" value="Update Todo" onClick={updateTodo}/>
						<input type="button" name="Close Todo" className="btn btn-danger" value="Close Todo" onClick={closeModal}/>
					</form>
			</Modal>
		</div>
	)
}

export default Todo;