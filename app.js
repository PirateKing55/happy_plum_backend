var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
require("./db/config");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manageUserRouter = require('./routes/manageUser');
var popUpFormRouter = require('./routes/popUpForm');
var homeworkRouter = require('./routes/homework');
var reviewSheetRouter = require('./routes/reviewSheet');
var testAssessmentRouter = require('./routes/testAssessment');
var flashCardsRouter = require('./routes/flashCards');
var projectRouter = require('./routes/project');

// teacher
var assignmentRouter = require('./routes/teacher/assignment');
var messageRouter = require('./routes/teacher/message');
var resourceRouter = require('./routes/teacher/resource');
var classOrganizationRouter = require('./routes/teacher/classOrganization');
var progressReportRouter = require('./routes/teacher/progressReport');
var communicationToolRouter = require('./routes/teacher/communicationTool');
var app = express();
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manageuser', manageUserRouter);
app.use('/popupform', popUpFormRouter);
app.use('/homework', homeworkRouter);
app.use('/reviewsheet',reviewSheetRouter);
app.use('/test-assessment',testAssessmentRouter);
app.use('/flash-cards',flashCardsRouter);
app.use('/project',projectRouter);
// teacher
app.use('/resource',resourceRouter);
app.use('/assignment',assignmentRouter);
app.use('/message',messageRouter);
app.use('/class-organization',classOrganizationRouter);
app.use('/progress-report',progressReportRouter);
app.use('/communication-tool',communicationToolRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
