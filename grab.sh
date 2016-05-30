function grab() {
  for var in "$@"; do
    git clone -b $var --single-branch https://github.com/omrilotan/grab.git TEMPREPO
    rm -rf TEMPREPO/.git
    mv TEMPREPO/* ./
    rmdir TEMPREPO
  done
}
