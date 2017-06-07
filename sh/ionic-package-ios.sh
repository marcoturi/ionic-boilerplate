#!/bin/bash

#inspired by
# https://github.com/devillex/wercker-ionic-package-step/blob/master/run.sh
# https://github.com/lewisl9029/toc/blob/50a96bc88035892083f87337dced9b9fe8c6d979/scripts/toc-package-download.sh

cli="ionic"

main() {

	# Command
  cmd="package build"

  # Command arguments
  args="ios"

  if [ -z "$IONIC_PACKAGE_BUILD_PROFILE" ]; then
    fail "ionic-package: build profile cannot be empty"
  fi

	# release
  if [ "$IONIC_PACKAGE_BUILD_RELEASE" = "true" ]; then
    args="$args --release"
  fi

	# profile
  if [ -n "$IONIC_PACKAGE_BUILD_PROFILE" ]; then
    args="$args --profile $IONIC_PACKAGE_BUILD_PROFILE"
  fi

  finalCmd="$cli $cmd $args"

  # echo $finalCmd;

  PACKAGE_ID="$($finalCmd | \
  grep "Build " | \
  sed -E 's/Build ([0-9]+)/\1/')" #on linux use sad -r on osx sad -E

  # echo $grepBuildId

  if [ "$PACKAGE_ID" == "" ]
    then
      echo "No package id specified"
      exit 2
    fi

    MAX_ATTEMPTS=15
    current_attempt=1
    echo "Downloading $1 package $PACKAGE_ID"
    until ionic package download $PACKAGE_ID || \
      [ "$current_attempt" == "$MAX_ATTEMPTS" ]
    do
      echo "Package download attempt $current_attempt failed. Trying again in 10 seconds."
      current_attempt=$((current_attempt+1))
      sleep 10
    done

  if [ "$current_attempt" == "$MAX_ATTEMPTS" ]
    then
      echo "Max attempts exceeded"
      exit 2
    fi
}


main;
