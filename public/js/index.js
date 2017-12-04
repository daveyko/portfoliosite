function check_if_in_view (el1, classToSearch, newClass, optionalClassToSearch, newClass2){

  let classToSearchArr = $.find(`.${classToSearch}`)
  let el1Height = $(el1).height()
  let el1Top = $(el1).scrollTop()
  let el1Bottom = el1Height + el1Top

  $.each(classToSearchArr, function(){
    let el2 = $(this)
    let el2Height = el2.outerHeight()
    let el2Top = el2.offset().top
    let el2Bottom = el2Height + el2Top

  if ((el2Bottom >= el1Top) && (el2Top <= el1Bottom)) {
    el2.addClass(newClass)
    if (optionalClassToSearch){
      el2.find(`.${optionalClassToSearch}`).addClass(newClass2)
    }
  } else {
    el2.removeClass(newClass)
  }
  })
}

$(() => {
  function scrollToAnchor(aid){
    var aTag = $("section[name='" + aid + "']");
    $('html, body').animate({scrollTop: aTag.offset().top}, 'slow')
  }

  $('#about-link').click(() => {
    scrollToAnchor('about')
  })

  $('.vNavNode').click(function(){
    scrollToAnchor($(this).attr('href') === '#' ? 'top' : $(this).attr('href').slice(1))
  })

  $('.nav-link').hover(
    function(){
      $(this).addClass('hover')},
    function(){$(this).removeClass('hover')}
  )
  let section_elements = $.find('section')
  let navNode_elements = $.find('.vNavNode')

  function check_if_in_view_2(){
    let currScrollPos = $(window).scrollTop()
    let index
    $.each(section_elements, function(key, val){
      let element = $(val)
      let elementHeight = element.outerHeight()
      let element_top = element.offset().top
      let element_bottom = elementHeight + element_top

    if (currScrollPos <= element_top) {
      index = key
      return false
    }
  }
)
    $('.vNavNode').removeClass('current')
    $('.vNav ul li a:eq(' + index + ')').addClass('current')
  }
     $(window).on('scroll resize', function(){
       check_if_in_view(window, 'animation-element', 'in-view', 'progress-bar', 'active')
       check_if_in_view_2()
     })
  }
)

