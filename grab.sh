function grab() {
  git clone -b $1 --single-branch https://github.com/omrilotan/grab.git TEMPREPO
  rm -rf TEMPREPO/.git
  mv TEMPREPO/* ./
  rmdir TEMPREPO
}

function grabs() {
  COLLECTION=''
  for var in "$@"; do
    if [ -n "$COLLECTION" ]; then
      COLLECTION="$COLLECTION && grab $var"
    else
      COLLECTION="grab $var"
    fi
  done
  eval $COLLECTION
  unset COLLECTION
}