import stringAvatar from '@/utils/stringAvatar'
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import EstimatesModal from './estimates'
import ModalWindow from './index'
import useUser from './../../hooks/useUser'
import { getTask, setEstimate, updateTask } from '@/api/task'

const STATUS_STATE = {
  0: 'To Do',
  1: 'In Progress',
  2: 'Done',
}

const EditTaskModal = ({ isOpen, handleClose, editedTaskId }) => {
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [titleValue, setTitleValue] = useState('')

  const [isEditDescription, setIsEditDescription] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState('')

  const [isEditUserEstimate, setIsEditUserEstimate] = useState(true)
  const [currentUserEstimate, setCurrentUserEstimate] = useState(0)

  const [taskStatus, setTaskStatus] = useState('')

  const [isOpenEstimatesList, setIsOpenEstimatesList] = useState(false)
  const [estimatesList, setEstimatesList] = useState([])
  const [averageEstimate, setAverageEstimate] = useState(0)

  const [taskInfo, setTaskInfo] = useState({})

  const [user] = useUser()

  useEffect(() => {
    const loadTaskInfo = async () => {
      const task = await getTask(editedTaskId)
      setTitleValue(task.title)
      setDescriptionValue(task.description)
      setAverageEstimate(task.average_estimate)
      setTaskStatus(task.status)
      setTaskInfo(task)

      if (task.Estimates) {
        const userEstimate = task.Estimates.find(
          (item) => item.user_id === user.id
        )
        if (userEstimate) {
          setCurrentUserEstimate(userEstimate.estimate)
          setIsEditUserEstimate(false)
          setEstimatesList(task.Estimates)
        }
      }
    }

    if (!isOpen) {
      setTitleValue('')
      setDescriptionValue('')
      setIsEditUserEstimate(true)
      setCurrentUserEstimate(0)
    } else {
      loadTaskInfo()
    }
  }, [isOpen])

  const onChangeUserEstimate = (value) => {
    if (value > 999) return
    setCurrentUserEstimate(+value)
  }

  const handleSaveUserEstimate = async () => {
    const allEstimates = await setEstimate(taskInfo.id, currentUserEstimate)
    setEstimatesList(allEstimates.estimates)
    setAverageEstimate(allEstimates.average_estimate)
    setIsEditUserEstimate(false)
  }

  const handleBlurInput = async () => {
    setIsEditTitle(false)
    setIsEditDescription(false)
    await updateTask(titleValue, descriptionValue, taskStatus, taskInfo.id)
  }

  const handleStatusChange = async (status) => {
    setTaskStatus(status)
    await updateTask(titleValue, descriptionValue, status, taskInfo.id)
  }

  const creatorName = taskInfo?.User?.firstName + ' ' + taskInfo?.User?.lastName
  const currentUserName = user.firstName + ' ' + user.lastName

  return (
    <ModalWindow isOpen={isOpen} handleClose={handleClose}>
      <Grid container spacing={2}>
        <Grid item xs={8} borderRight={'2px solid #0000001f'}>
          <Box sx={{ wordBreak: 'break-word' }}>
            {isEditTitle ? (
              <TextField
                autoFocus
                multiline
                onBlur={handleBlurInput}
                onChange={({ target: { value } }) => setTitleValue(value)}
                onKeyDown={({ code, target }) =>
                  code === 'Enter' && handleBlurInput()
                }
                value={titleValue}
                id="title"
                label="Введите название задания"
                variant="standard"
                fullWidth
              />
            ) : (
              <Typography
                variant="h6"
                component="h1"
                color={titleValue ? 'black' : 'gray'}
                onClick={() => {
                  if (taskInfo.created_by === user.id) {
                    setIsEditTitle(true)
                    setIsEditDescription(false)
                  }
                }}
              >
                {titleValue || 'Название задания'}
              </Typography>
            )}
            <Divider />
            <Box mt={1}>
              <Typography variant="h5" component="h2">
                Описание
              </Typography>
              {isEditDescription ? (
                <TextField
                  autoFocus
                  multiline
                  onBlur={handleBlurInput}
                  onChange={({ target: { value } }) =>
                    setDescriptionValue(value)
                  }
                  onKeyDown={({ code, target }) =>
                    code === 'Enter' && handleBlurInput()
                  }
                  value={descriptionValue}
                  id="description"
                  fullWidth
                />
              ) : (
                <Typography
                  color={descriptionValue ? 'black' : 'gray'}
                  onClick={() => {
                    if (taskInfo.created_by === user.id) {
                      setIsEditTitle(false)
                      setIsEditDescription(true)
                    }
                  }}
                >
                  {descriptionValue || 'Описание задания'}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Box
              bgcolor={'#f6f6f6'}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              {creatorName}
              <Avatar {...stringAvatar(creatorName)} />
            </Box>
            <Typography
              sx={{ textAlign: 'end', color: '#b4b4b4', fontSize: '12px' }}
            >
              Создатель
            </Typography>

            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="status">Статус</InputLabel>
                <Select
                  labelId="status"
                  value={taskStatus}
                  label="Статус"
                  onChange={({ target: { value } }) =>
                    handleStatusChange(value)
                  }
                >
                  {Object.entries(STATUS_STATE).map((status) => {
                    return (
                      <MenuItem key={status[0]} value={+status[0]}>
                        {status[1]}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>

            {isEditUserEstimate ? (
              <>
                <Typography fontSize={14} mb={1}>
                  Установить эстимейт (в часах)
                </Typography>
                <TextField
                  type={'number'}
                  label="Часов"
                  variant="outlined"
                  value={currentUserEstimate}
                  onChange={({ target: { value } }) =>
                    onChangeUserEstimate(value)
                  }
                  onKeyDown={({ code }) =>
                    code === 'Enter' && handleSaveUserEstimate()
                  }
                />
                <Box mt={1} sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    onClick={handleSaveUserEstimate}
                    size="small"
                    variant="outlined"
                  >
                    Подтвердить
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                  >
                    <Avatar {...stringAvatar(currentUserName)} />
                    Вы
                  </Box>
                  {currentUserEstimate} ч.
                </Box>

                <Box
                  mt={3}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Typography>Средний эстимейт:</Typography>
                  <Button
                    onClick={() => setIsOpenEstimatesList(true)}
                    variant="contained"
                    color="info"
                    sx={{ borderRadius: 4 }}
                  >
                    {averageEstimate}ч.
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Button onClick={handleClose}>
        {taskInfo.created_by === user.id ? 'Сохранить' : 'Закрыть'}
      </Button>
      <EstimatesModal
        estimatesList={estimatesList}
        isOpenEstimatesList={isOpenEstimatesList}
        handleClose={() => setIsOpenEstimatesList(false)}
      />
    </ModalWindow>
  )
}
export default EditTaskModal
