$(function(){
  let tags = []
  let seen = {}
  $('.work-list').each(function(i, e) {
    let tagArr = $(e).attr('data-category').split(',')
      .map((skill) => skill.trim())
    tagArr.forEach((skill) => {
      if (!seen[skill]){
        seen[skill] = true
        tags.push(skill)
      }
    }
  )
  })
})

