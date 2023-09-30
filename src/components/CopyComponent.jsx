import React from 'react';
import { useTheme,Stack } from '@mui/material';
import { Tooltip } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { Copy,TickCircle } from 'iconsax-react';
import copy from 'copy-to-clipboard';
const CopyComponent = ({ id }) => {
  const theme = useTheme();
  const [flag, setFlag] = React.useState(false);
  const copyID_ToClipboard = (id) => {
    setFlag(true);
    copy(id);
    setTimeout(() => {
      setFlag(false);
    }, 1000);
  };
  const CopiedSuccess = ()=>(
    <Stack sx={{m:0.5}} flexDirection="row" justifyContent="space-around" width="60px">
      <TickCircle size={18}/>
      <div>Copied</div>
    </Stack>
  )
  return (
    <Tooltip title={flag === false ? 'Click to Copy ' :<CopiedSuccess/>} arrow color={flag === false ?"secondary":"success"}>
      <ContentCopyRoundedIcon 
        onClick={(e) => {
          e.stopPropagation();
          copyID_ToClipboard(id);
        }}
        sx={{ color:"#398EED" ,"height":"24px" }}
      >
        <Copy />
      </ContentCopyRoundedIcon>
    </Tooltip>
  );
};
export default CopyComponent;
