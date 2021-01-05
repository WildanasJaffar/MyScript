<template>
  <div>
    <i class="las la-quote-left"></i>
    <span v-if="$route.params.message" class="msg">{{$route.params.message}}</span>
    <span v-else class="msg">About Us</span>
    <i class="las la-quote-right"></i>
  </div>
</template>
<style>
.msg {
  margin: 25px;
}
</style>