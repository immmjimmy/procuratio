import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#FF6961";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  assignmentCell: {
    marginTop: 20,
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Assignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentId: this.props.match.params.parent_id,
      student: {
        name: "Beep Boop"
      },
      assignments: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/assignments/student/100`);
    const body = await response.json();

    let assignments = [];
    body.forEach(el => {
      assignments.unshift({
        title: el.assignment.title,
        subject: el.assignment.subject,
        submission_link: el.submission_link,
        score: el.score,
        totalScore: el.total_score,
        dueDate: el.assignment.date
      });
    });

    this.setState({ assignments: assignments, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { assignments, student, parentId } = this.state;

    return (
      <>
        <Navbar parentId={parentId} />
        <FadeIn className={classes.fadeIn}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.container}
            spacing={2}
          >
            <Grid item className={classes.fullWidth}>
              <Grid item container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant="h2">
                    {"Viewing " + student.name + "'s Assignments"}
                  </Typography>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {assignments.map((assignment, i) => (
                        <Paper
                          className={classes.assignmentCell}
                          key={"assignmentCell_" + i}
                        >
                          <a
                            href={assignment.submission_link}
                            style={{
                              textDecoration: "none",
                              color: "black"
                            }}
                            target="_"
                          >
                            <Grid container>
                              <Grid item md={8} xs>
                                <Typography variant="h5">
                                  {assignment.title}
                                </Typography>
                              </Grid>
                              <Grid item md={2} xs>
                                <Typography variant="h5">
                                  {assignment.dueDate}
                                </Typography>
                              </Grid>
                              <Grid item md={2} xs>
                                <Typography variant="h5">
                                  Score: {assignment.score} /{" "}
                                  {assignment.totalScore}
                                </Typography>
                              </Grid>
                            </Grid>
                          </a>
                        </Paper>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        </FadeIn>
      </>
    );
  }
}

export default withStyles(styles)(Assignments);
