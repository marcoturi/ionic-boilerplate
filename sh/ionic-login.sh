#!/bin/bash

# Inspired by https://github.com/devillex/wercker-ionic-login-step/blob/master/run.sh
cli="ionic"

main() {

  if [ -z "$IONIC_LOGIN_EMAIL" ]; then
    fail "ionic-login: email argument cannot be empty"
  fi

	if [ -z "$IONIC_LOGIN_PASSWORD" ]; then
    fail "ionic-login: password argument cannot be empty"
  fi

	# Command
  cmd="login"

  # Command arguments
  args=

	# email
  if [ -n "$IONIC_LOGIN_EMAIL" ]; then
    args="$args --email \"$IONIC_LOGIN_EMAIL\""
  fi

	# password
  if [ -n "$IONIC_LOGIN_PASSWORD" ]; then
    args="$args --password \"$IONIC_LOGIN_PASSWORD\""
  fi

  eval "$cli" "$cmd" "$args"
}

main;
