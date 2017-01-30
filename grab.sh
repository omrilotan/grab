function grab() {
  mkdir TEMP_REPO_DIRECTORY
  cd TEMP_REPO_DIRECTORY
  git init
  git remote add origin https://github.com/omrilotan/grab.git
  git fetch origin
  for var in "$@"; do
    git checkout origin/master -- $var
    [ -e ./${var}/* ] && mv ./${var}/* ../
    [ -e ./${var}/.[!.][!.git]* ] && mv ./${var}/.[!.][!.git]* ../
  done
  cd ../
  rm -rf TEMP_REPO_DIRECTORY
}
