import React ,{ useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ReviewModal from "./ReviewModal";
import OutlinedButtons from "./ViewMore";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ReviewInfo from "../../components/Interface/Review";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
// Redux
import { useSelector,  useDispatch} from 'react-redux';
import { rootState } from '../../../stores/login/store';
import { getFeedAll } from '../../../stores/feed/actions/feedAll';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    heroContent: {
      padding: theme.spacing(15, 0, 20),
      backgroundImage:
        "url(https://media.giphy.com/media/jNdw5Qmy5MOpq/giphy.gif)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      
      backgroundPosition: "left",
      color: "#ffffff"
    },
    card: {
      maxWidth: 300,
      height: "100%",
      flexDirection: "column",
      marginLeft: 20,
      marginRight: 20
    },
    media: {
      height: 0,
      paddingTop: "90%" // 16:9
    },

    cardGrid: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(12)
    },
    divider: {
      backgroundColor: "#36342f",
      marginBottom: "80px"
    },
    divider2: {
      backgroundColor: "#36342f",
      marginTop: "100px",
      position: "relative",
      zIndex: 6
    },
    btn: {
      fontSize: "25px",
      paddingLeft: "50px",
      paddingRight: "50px"
    },
    btnGroup: {
      display: "flex",
      justifyContent: "center",
      zIndex: 5,
      position: "relative"
      // marginTop: "20px",
    },
    total: {
      display: "inline-block",
      marginLeft: "15px"
    },
    search: {
      display: "flex",
      justifycontent: "right"
    },
    home: {
      display: "inline-block flex",
      float: "right",
      marginRight: "20px"
    },
    more : {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    }
  })
);


export default function List() {
  const classes = useStyles();
  const [reviewState, setReviewState] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const { feedAll, isFeedAllPending, isFeedAllSucceess, isFeedAllError} = useSelector(
    (state: rootState) => state.feedAllReducer
  );

  let start : number = 0;
  let end : number = 0;

  const loadReviewList = async () => {
    console.log("onReviewList");
    await dispatch(getFeedAll());
  }
  const numEachPage : number = 30;

  const handleChange = (value : number) => {
    setMinValue((value-1) * numEachPage);
    setMaxValue((value) * numEachPage);
    // setState({
    //   minValue: (value - 1) * numEachPage,
    //   maxValue: value * numEachPage
    // });
  };

  if(!isFeedAllSucceess && !reviewState) {
    loadReviewList();
    setReviewState(true);
  } else {

  }

  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container>
          <Typography component="h1" variant="h1" align="center" style={{color : 'white'}}>
            Review List
          </Typography>
        </Container>
      </div>

      {/* <ReviewModal /> */}
      <div>
        <Link
          to={"/ranking"}
          className={classes.home}
          style={{ textDecoration: "none" }}
        >
          <Typography>Home > 리뷰 list</Typography>
        </Link>
      </div>
      <div className={classes.divider2}>
        <Divider variant="middle" />
      </div>
      <div className={classes.btnGroup}>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <Button className={classes.btn}>유럽 와인</Button>
          <Button className={classes.btn}>신대륙 와인</Button>
          <Button className={classes.btn}>한국 와인</Button>
        </ButtonGroup>
      </div>

      <Container className={classes.cardGrid}>
        <Typography className={classes.total}>Total {feedAll.length}</Typography>
        <Divider variant="middle" className={classes.divider} />
     
        <Grid container spacing={10}>
          {feedAll.slice(minValue, maxValue).map(feed => (
          
             <ReviewInfo
             fid={feed.fid}
             title={feed.title}
            nameEng={feed.wine.nameEng}
            content={feed.content}
            rating={feed.rating}
           
          />
     
          ))}

        </Grid>
        <div>
        <Pagination
      total={feedAll.length}
      // showTotal={total => `Total ${total} items`}
      onChange={handleChange}
      pageSize={numEachPage}
      defaultCurrent={1}
    /></div>
      </Container>
    </React.Fragment>
  );
}
