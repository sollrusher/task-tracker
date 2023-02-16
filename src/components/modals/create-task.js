import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ModalWindow from './index'

const CreateTaskModal = ({ isOpen, handleClose, createNewTask }) => {
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [titleValue, setTitleValue] = useState('')

  const [isEditDescription, setIsEditDescription] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setTitleValue('')
      setDescriptionValue('')
    }
  }, [isOpen])

  const handleBlurInput = () => {
    setIsEditTitle(false)
    setIsEditDescription(false)
  }

  const saveTask = () => {
    createNewTask(titleValue, descriptionValue)
    handleClose()
  }


  return (
    <ModalWindow isOpen={isOpen} handleClose={handleClose}>
      <Box sx={{ wordBreak: 'break-word' }}>
        {isEditTitle ? (
          <TextField
            autoFocus
            multiline
            onBlur={handleBlurInput}
            onChange={({ target: { value } }) => setTitleValue(value)}
            onKeyDown={({ code, target }) =>
              code === 'Enter' && handleBlurInput(target.id)
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
              setIsEditTitle(true)
              setIsEditDescription(false)
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
              onChange={({ target: { value } }) => setDescriptionValue(value)}
              onKeyDown={({ code, target }) =>
                code === 'Enter' && handleBlurInput(target.id)
              }
              value={descriptionValue}
              id="description"
              fullWidth
            />
          ) : (
            <Typography
              color={descriptionValue ? 'black' : 'gray'}
              onClick={() => {
                setIsEditTitle(false)
                setIsEditDescription(true)
              }}
            >
              {descriptionValue || 'Описание задания'}
            </Typography>
          )}
        </Box>
      </Box>
      <Button onClick={saveTask}>Сохранить</Button>
    </ModalWindow>
  )
}
export default CreateTaskModal
