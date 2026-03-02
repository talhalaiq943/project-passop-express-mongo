import { useState, useEffect } from 'react'
import Navbar from './navbar.jsx'
import { v4 as uuidv4 } from 'uuid'

const manager = () => {

  const [showFormPassword, setShowFormPassword] = useState(false)
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [password, setPassword] = useState([])
  const [visibleRows, setVisibleRows] = useState({})

  const getpasswords = async (params) => {
      let req = await fetch('http://localhost:3000/')
      let passwords = await req.json()
      setPassword(passwords)
      console.log(passwords)
      }

  useEffect(() => {
    try {
      getpasswords()
    }
     catch (error) {
      
      console.error('Error parsing passwords from server:', error)
      setPassword([])
    }
  }, [])
  const toggleFormPasswordVisibility = () => {
    setShowFormPassword(!showFormPassword)
  }
  const toggleRowVisibility = (index) => {
    setVisibleRows(prev => ({ ...prev, [index]: !prev[index] }))
  }
  const savepassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields")
      return
    }
    try {
      if (form._id) {
        const res = await fetch(`http://localhost:3000/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        if (res.ok) {
          await getpasswords()
        } else {
          alert("Failed to update password")
        }
      } else {
        const res = await fetch(`http://localhost:3000/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        if (res.ok) {
          await getpasswords()
        } else {
          alert("Failed to save password")
        }
      }
      clearForm()
    } catch (error) {
      console.error('Error saving password:', error)
      alert("Error: " + error.message)
    }
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  let editpasword = (item) => {
    setform(item)
  }

  const clearForm = () => {
    setform({ site: "", username: "", password: "" })
  }
  const delpass = async (id) => {
    try {
      const that = password.find(p => p._id === id)
      const res = await fetch(`http://localhost:3000/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: that._id })
      })
      if (res.ok) {
        await getpasswords()
      } else {
        alert("Failed to delete password")
      }
    } catch (error) {
      console.error('Error deleting password:', error)
      alert("Error: " + error.message)
    }
  }
  return (
    <div>
      <div className=' position absolute w-screen h-screen bg-linear-to-r from-[bg-slate-700] to-[#1f2937]'></div>
      <div className="content" style={{ position: 'relative', top: 0, left: 0, width: '100%' }}>
        <Navbar />
      </div>
      <div className=" position relative mx-auto container bg-slate-700 overflow-hidden mt-2 rounded-lg p-4 w-[90vw] h-[87vh]">
        <h1 className='font-bold text-4xl flex justify-center'>
          <span className='text-green-700'>&lt;</span>
          PASS
          <span className='text-green-700'>OP/&gt;</span>
        </h1>
        <p className='flex justify-center'>Your Own Password Manager</p>
        <div className=' position relative flex flex-col p-4 text-white '>
          <input onChange={handlechange} value={form.site} placeholder='Enter Website URL' className='bg-white text-black placeholder-gray-500 px-3 py-1 border-green-600 border-2 rounded-2xl' type="text" name='site' id='' />
          <div className='flex  justify-around gap-1 mt-2 relative'>
            <input onChange={handlechange} value={form.username} type="text" placeholder='Username' className=' w-[65%] bg-white text-black  placeholder-gray-500 px-3 py-1  border-2 border-green-600 rounded-2xl' name='username' />
            <div className='relative w-[35%] flex'>
              <input onChange={handlechange} value={form.password} type={showFormPassword ? "text" : "password"} placeholder='Password' className=' bg-white text-black placeholder-gray-500 px-3 py-1  border-2 border-green-600 rounded-2xl w-full pr-12' name='password' />
              <button
                onClick={toggleFormPasswordVisibility}
                className='absolute top-1/2 right-3 transform -translate-y-1/2  text-gray-600'>
                {showFormPassword ? <img src="/src/assets/icons/hide.png" alt="" width={30} /> : <img src="/src/assets/icons/show.png" alt="" width={30} />}
              </button>
            </div>
          </div>
          <div className='mt-2 flex justify-center gap-2'>
            <button onClick={savepassword} className='bg-green-600 mt-1.5 transition-all hover:bg-green-700 w-fit text-white font-bold py-2 px-4 rounded-3xl'>
              {form._id ? "Update" : "Save"}
            </button>
            {form._id && <button onClick={clearForm} className='bg-gray-600 mt-1.5 transition-all hover:bg-gray-700 w-fit text-white font-bold py-2 px-4 rounded-3xl'>
              Clear
            </button>}
          </div>
        </div>
        <div className="passwords ">
          <h2 className='text-2xl font-bold text-white mb-4 flex justify-center'>Saved Passwords</h2>
          {password.length == 0 && <p className='text-center text-gray-400'>No passwords saved yet.</p>}
          {password.length !== 0 && (<div>
            <table className="table-fixed w-full transition-all duration-1100 ease-in-out opacity-100">
              <thead className='bg-green-700 '>
                <tr>
                  <th className='w-1/2 px-2 overflow-hidden text-ellipsis whitespace-nowrap'>Website</th>
                  <th className='w-1/4'>Username</th>
                  <th className='w-1/4'>Password</th>
                  <th className='w-40'>Actions</th>
                </tr>
              </thead>
            </table>
            <div className='max-h-[55vh] overflow-y-auto transition-all duration-1100 ease-in-out opacity-100' >
              <table className="table-fixed w-full justify-center items-center">
                {password.map((item, index) => (
                  <tbody key={index} className='bg-green-200 text-black text-md transition-all duration-300 ease-in-out '>
                    <tr className='flex border-y-2'>
                      <td className=' border-x-2 whitespace-nowrap flex items-center justify-center w-1/2' >
                        {<a target='_blank' rel='noreferrer' className='flex justify-center items-center max-w-80 overflow-x-hidden  text-ellipsis' href={item.site}>{item.site}</a>}
                        <button className='transition-all hover:scale-110' onClick={() => navigator.clipboard.writeText(item.site)}>
                          <img src="/src/assets/icons/copy.png" alt="Copy" width={20} className="ml-2 cursor-pointer" />
                        </button>
                      </td>
                      <td className=' text-center  overflow-hidden self-center text-ellipsis w-1/4'>
                        <div className='flex justify-center items-center h-10'>
                          <div className='w-20 overflow-hidden  text-ellipsis'>{item.username}</div>
                          <button className='transition-all hover:scale-110' onClick={() => navigator.clipboard.writeText(item.username)}>
                            <img src="/src/assets/icons/copy.png" alt="Copy" width={20} className="ml-2 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                      <td className=' border-x-2 flex justify-center items-center self-center w-1/4'>
                        <div className='p-5 max-w-40 overflow-hidden text-ellipsis'><span >{visibleRows[index] ? item.password : '•'.repeat(8)}</span></div>
                        <button className='transition-all hover:scale-110' onClick={() => navigator.clipboard.writeText(item.password)}>
                          <img src="/src/assets/icons/copy.png" alt="Copy" width={20} className="ml-2 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => toggleRowVisibility(index)}
                          className='  text-gray-600 p-3'
                        >
                          {visibleRows[index] ? <img src="/src/assets/icons/hide.png" alt="" width={24} /> : <img src="/src/assets/icons/show.png" alt="" width={24} />}
                        </button>
                      </td>
                      <td className=' flex justify-center items-center self-center w-40'>
                        <div className='flex justify-center items-center gap-2.5'>
                          <button onClick={() => {
                            editpasword(item)
                          }}>
                            <img src="/src/assets/icons/edit.png" alt="Edit" width={25} className="ml-2 cursor-pointer transition-all hover:scale-110"></img>
                          </button>
                          <button>
                            <img src="/src/assets/icons/delete.png" alt="Delete" width={25} className="ml-2 cursor-pointer transition-all hover:scale-110" onClick={() => {
                              delpass(item._id)
                            }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default manager