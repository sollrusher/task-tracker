import { getTasksList } from '@/api/task'
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import TaskCard from './card'
import CreateTaskModal from './modals/create-task'
import { createTask } from './../api/task'
import EditTaskModal from './modals/edit-task'
import useUser from './../hooks/useUser'

const Tasks = () => {
  const [createTaskModal, setCreateTaskModal] = useState({
    isOpen: false,
    status: null,
  })
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [editedTaskId, setEditedTaskId] = useState({})

  const [user] = useUser()

  const createNewTask = async (title, description) => {
    const newTask = await createTask(title, description, createTaskModal.status)
    setTasks([...tasks, newTask])
  }

  const handleChooseEditedTask = (taskId) => {
    setEditedTaskId(taskId)
    setIsEditTaskModalOpen(true)
  }
  const getTasks = async () => {
    try {
      const tasks = await getTasksList()
      setTasks(tasks)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseEditTaskModal = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTaskId.id ? editedTaskId : task
    )
    setTasks(updatedTasks)
    setIsEditTaskModalOpen(false)
    setEditedTaskId()
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Container sx={{ marginTop: '85px', marginLeft: '10px' }}>
      <Grid container spacing={4}>
        <Grid item>
          <Typography
            sx={{
              padding: '10px 20px',
              borderLeft: '1px solid black',
              borderBottom: '1px solid black',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            To do
          </Typography>
          <Stack spacing={2} minWidth={300}>
            {tasks
              .filter((task) => task.status === 0)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleChooseEditedTask={handleChooseEditedTask}
                />
              ))}
            <Divider />
            <Card
              sx={{
                cursor: 'pointer',
                ':hover': { background: '#f8f8f8' },
                ':active': { background: '#f0f0f0' },
              }}
            >
              <CardContent
                onClick={() => setCreateTaskModal({ isOpen: true, status: 0 })}
              >
                <Typography>Добавить +</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            sx={{
              padding: '10px 20px',
              borderLeft: '1px solid black',
              borderBottom: '1px solid black',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            In Progress
          </Typography>
          <Stack spacing={2} minWidth={300}>
            {tasks
              .filter((task) => task.status === 1)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleChooseEditedTask={handleChooseEditedTask}
                />
              ))}
            <Divider />
            <Card
              sx={{
                cursor: 'pointer',
                ':hover': { background: '#f8f8f8' },
                ':active': { background: '#f0f0f0' },
              }}
            >
              <CardContent
                onClick={() => setCreateTaskModal({ isOpen: true, status: 1 })}
              >
                <Typography>Добавить +</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            sx={{
              padding: '10px 20px',
              borderLeft: '1px solid black',
              borderBottom: '1px solid black',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Done
          </Typography>
          <Stack spacing={2} minWidth={300}>
            {tasks
              .filter((task) => task.status === 2)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleChooseEditedTask={handleChooseEditedTask}
                />
              ))}
            <Divider />
            <Card
              sx={{
                cursor: 'pointer',
                ':hover': { background: '#f8f8f8' },
                ':active': { background: '#f0f0f0' },
              }}
            >
              <CardContent
                onClick={() => setCreateTaskModal({ isOpen: true, status: 2 })}
              >
                <Typography>Добавить +</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <CreateTaskModal
        isOpen={createTaskModal.isOpen}
        status={createTaskModal}
        handleClose={() => setCreateTaskModal({ isOpen: false, status: null })}
        createNewTask={createNewTask}
      />
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        handleClose={handleCloseEditTaskModal}
        editedTaskId={editedTaskId}
      />
    </Container>
  )
}

export default Tasks
