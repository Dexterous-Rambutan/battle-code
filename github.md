## Dexterous-Rambutan Git Workflow

1. **GITHUB**: Fork Dexterous-Rambutan/battle-code
1. **LOCAL**: git clone user/battle-code
1. **LOCAL**: git remote add upstream Dexterous-Rambutan/battle-code

<hr>

### Development Worklow
1. Find issue that you were assigned
  a. Or Assign issue to yourself
1. **LOCAL** || git status to make sure you are on master
1. **LOCAL** || git pull --rebase usptream master => makes sure master is up to date with truth
1. **LOCAL** || git checkout -b feature-IssueThatYouWereAssigned
1. **GITHUB** || pull request Create initial pull request with Task list of issues
1. **LOCAL** || git status => to check branch
1. Cyclical
  a. make edits
  b. git add
  c. git commit
1. **LOCAL** || git pull --rebase upstream master
1. **LOCAL** || git push origin feature-IssueThatYouWereAssigned
1. **GITHUB** || pull request finalize and assign
1. **GITHUB** || fill out git-splainin within pull request comment field
1. *IF MAKING Changes to pull request*
  1. **LOCAL** || make changes locally
  1. **LOCAL** || git add
  1. **LOCAL** || git commit
  1. **LOCAL** || git pull --rebase upstream master
  1. **LOCAL** || git push origin feature-IssueThatYouWereAssigned


### SCRUM MASTER // SECOND SET OF EYES
1. review changes and merge
1. merge request
