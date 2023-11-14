import { FC, memo } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';

type P = {
    toggle: () => void,
    open: boolean,
    confirmLogOut: () => void
}

const LogOut: FC<P> = ({ open, toggle, confirmLogOut }) => {
    
    return <div>
        <Dialog open={open} onClose={toggle} maxWidth="sm">
            <DialogTitle variant='caption' sx={{ mt: 2, mx: 2 }}>
                {open ? (
                    <IconButton
                        aria-label="close"
                        onClick={toggle}
                        size="small"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        {/* <CloseIcon /> */}
                    </IconButton>
                ) : null}

                <Typography variant="h4" align="center" fontWeight={600}>
                    Are you sure?
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ width: 350, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body1" align="center" fontWeight={500} color="text.secondary">
                    Do you really wish to log out
                </Typography>
            </DialogContent>
            <DialogActions sx={{ mb: 2, mx: 2 }}>
                <Button onClick={toggle} type="button" variant="outlined" fullWidth>
                    No
                </Button>
                <Button variant="contained" color="error" fullWidth onClick={confirmLogOut}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}
export default memo(LogOut);