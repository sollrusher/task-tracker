import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function TaskCard({ task, handleChooseEditedTask }) {
  return (
    <Card
      onClick={() => handleChooseEditedTask(task.id)}
      sx={{
        cursor: 'pointer',
        ':hover': { background: '#f8f8f8' },
        ':active': { background: '#f0f0f0' },
      }}
    >
      <CardContent>
        <Typography fontWeight={700}>{task.title}</Typography>
        <Typography>
          {task.description?.length > 30
            ? task.description.slice(0, 30) + '...'
            : task.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
