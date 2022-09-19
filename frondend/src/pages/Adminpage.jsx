import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
    
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Id</th>
        {/* <th>Edit</th>
        <th>Block</th> */}
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {user.map((user)=>(

<tr>
<td>1</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user._id}</td>
{/* <td><Button >Edit</Button></td>
<td><Button>Block</Button></td> */}

<td><Button  
    variant="danger" onClick={() => deleteHandler(user._id)} >Delete</Button></td>
</tr>

      ))}
      
      
    </tbody>
  </Table>
  )
}

export default Dashboard